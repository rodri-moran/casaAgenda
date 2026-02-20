import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { Apartment } from '../../../../apartments/models/apartment.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-booking-detail-panel',
  templateUrl: './booking-detail-panel.component.html',
  styleUrls: ['./booking-detail-panel.component.css'],
})
export class BookingDetailPanelComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  @Input({ required: true }) booking!: Booking;
  @Input() apartment: Apartment | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Booking>();
  @Output() cancel = new EventEmitter<Booking>();
  @Output() export = new EventEmitter<Booking>();

  title = computed(() => this.apartment?.name ?? `Depto #${this.booking?.apartmentId ?? '—'}`);

  // helpers simples para mostrar fechas mas esteticas sin librerias
  fmt = (iso: string | null | undefined) => (iso ? iso.split('-').reverse().join('/') : '—');

  confirmCancel() {}
  copyText() {
    const text = this.buildText();
    navigator.clipboard.writeText(text);
  }

  private formatDateAr(dateStr: string | null | undefined): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  get checkInFmt(): string {
    return this.formatDateAr(this.booking?.checkIn);
  }

  get checkOutFmt(): string {
    return this.formatDateAr(this.booking?.checkOut);
  }

  buildText(): string {
    const b = this.booking;
    const apt = this.apartment?.name ?? '-';

    return `*Nombre=* ${b.guestName}
*Departamento=* ${apt}
*Fecha=* ${b.checkIn} al ${b.checkOut}
*Total=* $${b.total}
*Seña=* $${b.deposit}
*Resto=* $${b.remaining}
*Días=* ${b.nights + 1}
*Noches=* ${b.nights}
*Personas=* ${b.people}
* x Noche=* $${b.priceNight}
`;
  }

  @ViewChild('exportSheet') exportSheet!: ElementRef<HTMLDivElement>;
  // Reserva - ${safe(b.guestName)} - ${safe(b.checkIn)} - ${safe(b.checkOut)}Reserva - ${safe(b.guestName)} - ${safe(b.checkIn)} - ${safe(b.checkOut)}

  async exportImage() {
    if (!this.exportSheet?.nativeElement) return;

    const element = this.exportSheet.nativeElement;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#0b1220',
    });

    const imgData = canvas.toDataURL('image/png');
    const safeName = (this.booking.guestName ?? 'reserva')
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^\w\-]/g, '');

    const checkIn = this.checkInFmt;
    const checkOut = this.checkOutFmt;

    const fileName = `reserva_${safeName}_${checkIn}-${checkOut}.jpg`;

    const link = document.createElement('a');
    link.href = imgData;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportPdf() {
    const html = this.buildPrintableHtml();
    const w = window.open('', '_blank', 'width=900,height=900');

    if (!w) return;

    w.document.open();
    w.document.write(html);
    w.document.close();

    w.onload = () => {
      w.focus();
      w.print();
      // w.close();
    };
  }
  private buildPrintableHtml(): string {
    const b = this.booking;
    const apt = this.apartment?.name ?? '—';

    const safe = (s: any) => String(s ?? '');
    const inFmt = this.formatDateAr(b.checkIn);
    const outFmt = this.formatDateAr(b.checkOut);

    return `
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Reserva - ${safe(b.guestName)} - ${inFmt} - ${outFmt}</title>
  <style>
    :root{
      --bg:#0b1220;
      --text:#111;
      --muted:#555;
      --border:#e6e6e6;
      --accent:#14b8a6;
      --accent2:#a78bfa;
    }

    body{
      margin:0;
      font-family: Segoe UI, Roboto, Arial, sans-serif;
      color: var(--text);
      background: #fff;
    }

    .page{
      padding: 28px;
      max-width: 820px;
      margin: 0 auto;
    }

    .header{
      display:flex;
      justify-content: space-between;
      align-items:flex-start;
      gap: 12px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 16px;
    }

    .brand{
      font-weight: 900;
      font-size: 18px;
      letter-spacing: .2px;
    }

    .sub{
      color: var(--muted);
      font-size: 13px;
      margin-top: 4px;
    }

    .badge{
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
      color: var(--muted);
      white-space: nowrap;
    }

    .grid{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 14px;
    }

    .box{
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px;
    }

    .k{
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .v{
      font-size: 14px;
      font-weight: 700;
    }

    .full{ grid-column: 1 / -1; }

    .money{
      font-size: 16px;
      font-weight: 900;
    }

    .accent{
      color: var(--accent);
    }

    .notes{
      margin-top: 16px;
      border-top: 1px dashed var(--border);
      padding-top: 12px;
      color: #333;
      font-size: 13px;
      line-height: 1.4;
    }

    .thanks{
      margin-top: 10px;
      font-weight: 800;
    }

    @media print{
      .page{ padding: 0; }
      .badge{ border-color:#ddd; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <div class="brand">Reserva ${safe(b.guestName)} - ${inFmt} - ${outFmt}</div>
        <div class="sub">Resumen para enviar al inquilino</div>
      </div>
      <div class="badge">Generado: ${new Date().toLocaleString('es-AR')}</div>
    </div>

    <div class="grid">
      <div class="box">
        <div class="k">Nombre</div>
        <div class="v">${safe(b.guestName)}</div>
      </div>

      <div class="box">
        <div class="k">Departamento</div>
        <div class="v">${safe(apt)}</div>
      </div>

      <div class="box">
        <div class="k">Fechas</div>
        <div class="v">${inFmt} → ${outFmt}</div>
      </div>

      <div class="box">
        <div class="k">Noches</div>
        <div class="v">${safe(b.nights)}</div>
      </div>

      <div class="box">
        <div class="k">Personas</div>
        <div class="v">${safe(b.people)}</div>
      </div>

      <div class="box">
        <div class="k">Precio por noche</div>
        <div class="v money">$${safe(b.priceNight)}</div>
      </div>

      <div class="box">
        <div class="k">Total</div>
        <div class="v money">$${safe(b.total)}</div>
      </div>

      <div class="box">
        <div class="k">Seña / Depósito</div>
        <div class="v money">$${safe(b.deposit)}</div>
      </div>

      <div class="box full">
        <div class="k">Restante</div>
        <div class="v money accent">$${safe(b.remaining)}</div>
      </div>
    </div>

  </div>
</body>
</html>
`;

    // <div class="notes">
    //   <div><strong>Ingreso:</strong> DESPUÉS DE LAS 12 PM</div>
    //   <div><strong>Egreso:</strong> ANTES DE LAS 10 AM</div>
    //   <div><strong>Traer:</strong> juego de sábanas y toallones</div>
    //   <div class="thanks">MUCHAS GRACIAS 🙌🏽</div>
    // </div>
  }
}
