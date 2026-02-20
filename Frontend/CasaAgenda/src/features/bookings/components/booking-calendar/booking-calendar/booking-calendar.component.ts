import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Booking } from '../../../models/booking.model';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css'],
  imports: [FullCalendarModule, CommonModule],
})
export class BookingCalendarComponent implements OnInit {
  // pasamos las reservas del depto seleccionado
  @Input() bookings: Booking[] = [];

  @Output() selectedBooking = new EventEmitter<number>();

  // configuración del calendario
  calendarOptions: any = {
    locale: esLocale,
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth',
    },
    events: [],
        eventClick: (info: any) => {
      // FullCalendar guarda el id en info.event.id (string)
      const id = Number(info.event.id);
      if (!Number.isNaN(id)) {
        this.selectedBooking.emit(id);
      }
    },
  };


  //cuando cambian las reservas, se actualizan los eventos
  ngOnChanges(): void {
    // Cada vez que cambie bookings, recalculamos events
    this.calendarOptions = {
      ...this.calendarOptions,
      // events es donde FullCalendar recibe los eventos
      events: this.bookingsToEvents(this.bookings),
    };
  }

  private bookingsToEvents(bookings: Booking[]) {
    return bookings.map((b) => ({
      id: String(b.id),
      title: b.guestName,
      start: b.checkIn,
      end: b.checkOut,
      allDay: true,
    }));
  }

  constructor() {}

  ngOnInit() {}
}
