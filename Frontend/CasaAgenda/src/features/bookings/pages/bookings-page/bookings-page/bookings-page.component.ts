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
import { Subject, switchMap, shareReplay } from 'rxjs';
import { BookingEditModalComponent } from '../../../dialogs/booking-edit-modal/booking-edit-modal/booking-edit-modal.component';
import { ApartmentService } from '../../../../apartments/services/apartment.service';
import { ApartmentResponseDto } from '../../../../apartments/models/apartmentResponseDto';
import { Observable } from 'rxjs';
import { BookingService } from '../../../services/booking.service';
import { BookingResponseDto } from '../../../dtos/bookingResponseDto';
import { Status } from '../../../enum/status';
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
  private apartmentService = inject(ApartmentService);
  private service = inject(BookingService);
  apartments$: Observable<ApartmentResponseDto[]> = this.apartmentService.getAll();
  bookings = signal<BookingResponseDto[]>([]);

  apartments = toSignal(this.apartments$, { initialValue: [] });

  selectedApartmentId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.service.getByStatus([Status.ACTIVE, Status.PENDING]).subscribe({
      next: (list) => this.bookings.set(list),
      error: (err) => console.error(err),
    });

    this.route.queryParamMap.subscribe((params) => {
      const depto = params.get('depto');
      this.selectedApartmentId = depto ? Number(depto) : null;
    });
  }

  selectedBookingId = signal<number | null>(null);

  selectedBooking = computed(() => {
    const id = this.selectedBookingId();
    const bks = this.bookings();
    return id ? (bks.find((b) => b.id === id) ?? null) : null;
  });

  get filteredBookings(): BookingResponseDto[] {
    if (!this.selectedApartmentId) return [];
    const bks = this.bookings();
    return bks.filter((b) => b.apartmentId === this.selectedApartmentId);
  }

  selectedApartment = computed(() => {
    const b = this.selectedBooking();
    const apts = this.apartments();
    return b ? (apts.find((a) => a.id === b.apartmentId) ?? null) : null;
  });
  editingBooking: BookingResponseDto | null = null;
  openEditModal(b: BookingResponseDto) {
    this.editingBooking = b;
  }

  updateList(cancelled: BookingResponseDto) {
    this.bookings.update((list) => list.filter((b) => b.id !== cancelled.id));
    this.selectedBookingId.set(null);
    if (this.editingBooking?.id === cancelled.id) {
      this.editingBooking = null;
    }
  }

  onBookingCreated(b: BookingResponseDto) {
    this.bookings.update((current) => [b, ...current]);

    // this.selectedBookingId.set(b.id);
  }

  onBookingUpdated(updated: BookingResponseDto) {
    this.bookings.update((list) => list.map((b) => (b.id === updated.id ? updated : b)));

    this.selectedBookingId.set(updated.id);
  }

  onBookingCancelled(cancelled: BookingResponseDto) {
    this.bookings.update((list) => list.filter((b) => b.id !== cancelled.id));
    this.selectedBookingId.set(null);
  }
}
