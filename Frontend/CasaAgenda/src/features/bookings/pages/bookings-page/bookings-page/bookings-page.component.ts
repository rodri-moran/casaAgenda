import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingCalendarComponent } from '../../../components/booking-calendar/booking-calendar/booking-calendar.component';
import { Booking } from '../../../models/booking.model';
import { Apartment } from '../../../../apartments/models/apartment.model';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';
import { BookingFormModalComponent } from '../../../dialogs/booking-form-modal/booking-form-modal/booking-form-modal.component';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-bookings-page',
  standalone: true,
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.css'],
  imports: [CommonModule, BookingCalendarComponent, ReactiveFormsModule, BookingFormModalComponent],
})
export class BookingsPageComponent implements OnInit {
  apartments: Apartment[] = [
    { id: 1, name: 'Depto Centro', capacity: 4, pricePerPerson: 10000 },
    { id: 2, name: 'Depto Cascada', capacity: 3, pricePerPerson: 15000 },
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
      remaining: 70000,
      priceNight: 20000,
      pricePerPerson: 15000,
      total: 90000,
      status: 'pending',
      nights: 3,
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
}
