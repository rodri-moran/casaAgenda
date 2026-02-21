import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { BookingCalendarComponent } from '../../../components/booking-calendar/booking-calendar/booking-calendar.component';
import { Booking } from '../../../models/booking.model';
import { Apartment } from '../../../../apartments/models/apartment.model';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';
import { BookingFormModalComponent } from '../../../dialogs/booking-form-modal/booking-form-modal/booking-form-modal.component';
import { BookingDetailPanelComponent } from '../../../components/booking-detail-panel/booking-detail-panel/booking-detail-panel.component';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BookingEditModalComponent } from '../../../dialogs/booking-edit-modal/booking-edit-modal/booking-edit-modal.component';
declare const window: any;
@Component({
  selector: 'app-bookings-page',
  standalone: true,
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.css'],

  imports: [
    CommonModule,
    BookingCalendarComponent,
    ReactiveFormsModule,
    BookingFormModalComponent,
    BookingDetailPanelComponent,
    BookingEditModalComponent,
  ],
})
export class BookingsPageComponent implements OnInit {
  apartments: Apartment[] = [
    { id: 1, name: 'Depto Centro', capacity: 4 },
    { id: 2, name: 'Depto Cascada', capacity: 3 },
  ];

  bookings: Booking[] = [
    {
      id: 1,
      apartmentId: 1,
      guestName: 'Juan Pérez',
      checkIn: '2026-02-10',
      checkOut: '2026-02-15',
      people: 3,
      deposit: 50000,
      remaining: 100000,
      priceNight: 30000,
      pricePerPerson: 10000,
      total: 150000,
      status: 'pending',
      nights: 5,
    },
    {
      id: 2,
      apartmentId: 2,
      guestName: 'Ana Gómez',
      checkIn: '2026-02-12',
      checkOut: '2026-02-14',
      people: 2,
      deposit: 20000,
      remaining: 40000,
      priceNight: 30000,
      pricePerPerson: 15000,
      total: 60000,
      status: 'pending',
      nights: 2,
    },
  ];

  selectedApartmentId: number | null = null;

  get filteredBookings(): Booking[] {
    if (!this.selectedApartmentId) return [];
    return this.bookings.filter((b) => b.apartmentId === this.selectedApartmentId);
  }
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const depto = params.get('depto');
      this.selectedApartmentId = depto ? Number(depto) : null;
    });
  }

  selectedBookingId = signal<number | null>(null);

  selectedBooking = computed(() => {
    const id = this.selectedBookingId();
    return id ? (this.bookings.find((b) => b.id === id) ?? null) : null;
  });

  selectedApartment = computed(() => {
    const b = this.selectedBooking();
    return b ? (this.apartments.find((a) => a.id === b.apartmentId) ?? null) : null;
  });
  editingBooking: Booking | null = null;
  openEditModal(b: Booking) {
    this.editingBooking = b;
  }

  openCancelDialog(b: Booking) {
    console.log('CANCEL', b);
  }
}
