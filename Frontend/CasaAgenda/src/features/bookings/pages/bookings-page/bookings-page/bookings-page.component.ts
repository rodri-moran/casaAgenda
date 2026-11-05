import { Component, OnDestroy, OnInit, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookingCalendarComponent } from '../../../components/booking-calendar/booking-calendar/booking-calendar.component';
import { BookingFormModalComponent } from '../../../dialogs/booking-form-modal/booking-form-modal/booking-form-modal.component';
import { BookingDetailPanelComponent } from '../../../components/booking-detail-panel/booking-detail-panel/booking-detail-panel.component';
import { BookingEditModalComponent } from '../../../dialogs/booking-edit-modal/booking-edit-modal/booking-edit-modal.component';
import { ApartmentService } from '../../../../apartments/services/apartment.service';
import { BookingService } from '../../../services/booking.service';
import { BookingResponseDto } from '../../../dtos/bookingResponseDto';
import { Status } from '../../../enum/status';
import { BookingCalculatorService } from '../../../../../shared/services/booking-calculator.service';

@Component({
  selector: 'app-bookings-page',
  standalone: true,
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.css'],
  imports: [
    BookingCalendarComponent,
    BookingFormModalComponent,
    BookingDetailPanelComponent,
    BookingEditModalComponent,
  ],
})
export class BookingsPageComponent implements OnInit, OnDestroy {
  private apartmentService = inject(ApartmentService);
  private service = inject(BookingService);
  private calc = inject(BookingCalculatorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly Status = Status;

  apartments = toSignal(this.apartmentService.getAll(), { initialValue: [] });
  bookings = signal<BookingResponseDto[]>([]);

  // El que viene en la URL (?depto=) o el que se eligió en la lista desplegable.
  private requestedApartmentId = signal<number | null>(null);

  // Siempre hay uno elegido (si hay departamentos): así el calendario se ve apenas entrás.
  selectedApartmentId = computed(() => {
    const apts = this.apartments();
    const requested = this.requestedApartmentId();
    if (requested !== null && apts.some((a) => a.id === requested)) return requested;
    return apts[0]?.id ?? null;
  });

  filteredBookings = computed(() => {
    const id = this.selectedApartmentId();
    if (!id) return [];
    return this.bookings().filter((b) => b.apartmentId === id);
  });

  // Lista de abajo del calendario: en curso y próximas, ordenadas por fecha de entrada.
  upcoming = computed(() =>
    [...this.filteredBookings()].sort((a, b) => a.checkIn.localeCompare(b.checkIn)),
  );

  selectedBookingId = signal<number | null>(null);

  selectedBooking = computed(() => {
    const id = this.selectedBookingId();
    return id ? (this.bookings().find((b) => b.id === id) ?? null) : null;
  });

  selectedApartment = computed(() => {
    const b = this.selectedBooking();
    return b ? (this.apartments().find((a) => a.id === b.apartmentId) ?? null) : null;
  });

  editingBooking: BookingResponseDto | null = null;

  constructor() {
    // En el teléfono el detalle se abre como panel desde abajo:
    // mientras está abierto, la página de atrás no se mueve.
    effect(() => {
      document.body.classList.toggle('detail-sheet-open', this.selectedBooking() !== null);
    });
  }

  ngOnInit(): void {
    this.service.getByStatus([Status.ACTIVE, Status.PENDING]).subscribe({
      next: (list) => this.bookings.set(list),
      error: (err) => console.error(err),
    });

    this.route.queryParamMap.subscribe((params) => {
      const depto = params.get('depto');
      this.requestedApartmentId.set(depto ? Number(depto) : null);
    });
  }

  ngOnDestroy(): void {
    document.body.classList.remove('detail-sheet-open');
  }

  selectApartment(value: string) {
    const id = Number(value);
    if (!id) return;
    this.requestedApartmentId.set(id);
    this.selectedBookingId.set(null);
    // Queda en la URL, así si se recarga la página sigue en el mismo departamento.
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { depto: id },
      replaceUrl: true,
    });
  }

  shortDate(iso: string): string {
    if (!iso) return '—';
    return new Date(iso + 'T00:00:00')
      .toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
      .replace(/[.,]/g, '');
  }

  nightsLabel(b: BookingResponseDto): string {
    const n = this.calc.calcNights(b.checkIn, b.checkOut);
    return n === 1 ? '1 noche' : `${n} noches`;
  }

  openEditModal(b: BookingResponseDto) {
    this.editingBooking = b;
  }

  onBookingCreated(b: BookingResponseDto) {
    this.bookings.update((current) => [b, ...current]);
  }

  onBookingUpdated(updated: BookingResponseDto) {
    this.bookings.update((list) => list.map((b) => (b.id === updated.id ? updated : b)));
    this.selectedBookingId.set(updated.id);
  }

  onBookingCancelled(cancelled: BookingResponseDto) {
    this.bookings.update((list) => list.filter((b) => b.id !== cancelled.id));
    this.selectedBookingId.set(null);
    if (this.editingBooking?.id === cancelled.id) {
      this.editingBooking = null;
    }
  }
}
