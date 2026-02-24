import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../../../models/booking.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { dateRangeValidator } from '../../../../../shared/validators/dateRangeValidator';
import { BookingCalculatorService } from '../../../../../shared/services/booking-calculator.service';
import { BookingResponseDto } from '../../../dtos/bookingResponseDto';
import { Status } from '../../../enum/status';
import { BookingUpdateDto } from '../../../dtos/boookingUpdateDto';
import { BookingService } from '../../../services/booking.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../../../shared/ui/toast/toast.service';
import { Router } from '@angular/router';
declare const window: any;
@Component({
  selector: 'app-booking-edit-modal',
  templateUrl: './booking-edit-modal.component.html',
  styleUrls: ['./booking-edit-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class BookingEditModalComponent implements OnInit {
  @Input() booking: BookingResponseDto | null = null;
  @Output() updated = new EventEmitter<BookingResponseDto>();

  private fb = inject(FormBuilder);
  private service = inject(BookingService);
  private toast = inject(ToastService);
  private router = inject(Router);

  editForm = this.fb.group(
    {
      apartmentId: [-1, [Validators.required, Validators.min(1)]],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      guestName: ['', [Validators.required, Validators.maxLength(100)]],
      people: [1, [Validators.required, Validators.min(1)]],
      deposit: [0, [Validators.required, Validators.min(0)]],
      pricePerPerson: [0, [Validators.required, Validators.min(0)]],
      status: [Status.PENDING],

      // calculados
      priceNight: [{ value: 0, disabled: true }],
      nights: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      remaining: [{ value: 0, disabled: true }],

      notes: ['', [Validators.maxLength(300)]],
    },
    { validators: dateRangeValidator() },
  );
  onSubmit() {
    const dto = this.toUpdateDto();
    this.service.update(this.booking!.id, dto).subscribe({
      next: (updatedBooking) => {
        this.toast.success('Reserva .actualizada correctamente');
        this.updated.emit(updatedBooking);
        this.closeModal();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409 || this.isNotAvailableError(err)) {
          this.editForm.setErrors({ notAvailable: true });
          this.editForm.markAllAsTouched();

          this.toast.error('Departamento no disponible para esas fechas.');
          return;
        }
        this.toast.error('Ocurrió un error al editar la reserva.');
      },
    });
  }

  private isNotAvailableError(err: HttpErrorResponse): boolean {
    const body: any = err.error;
    return body?.code === 'APARTMENT_NOT_AVAILABLE' || body?.message?.includes('not available');
  }

  closeModal() {
    const modalEl = document.getElementById('bookingEditModal');
    if (!modalEl) return;

    const modal =
      window.bootstrap.Modal.getInstance(modalEl) ?? new window.bootstrap.Modal(modalEl);

    modal.hide();
  }

  private toUpdateDto(): BookingUpdateDto {
    const v = this.editForm.getRawValue();

    return {
      apartmentId: Number(v.apartmentId),
      checkIn: v.checkIn!,
      checkOut: v.checkOut!,
      guestName: v.guestName!,
      people: Number(v.people),
      deposit: Number(v.deposit),
      remaining: Number(v.remaining),
      total: Number(v.total),
      notes: v.notes ?? undefined,
      priceNight: Number(v.priceNight),
      pricePerPerson: Number(v.pricePerPerson),
    };
  }

  constructor(private calc: BookingCalculatorService) {
    effect(() => {
      this.editForm.patchValue(
        {
          nights: this.nights(),
          priceNight: this.priceNight(),
          total: this.total(),
          remaining: this.remaining(),
        },
        { emitEvent: false },
      );
    });
  }

  ngOnInit() {}

  ngOnChanges() {
    if (!this.booking) return;
    this.editForm.patchValue(
      {
        apartmentId: this.booking.apartmentId,
        checkIn: this.booking.checkIn,
        checkOut: this.booking.checkOut,
        guestName: this.booking.guestName,
        people: this.booking.people,
        deposit: this.booking.deposit,
        pricePerPerson: this.booking.pricePerPerson,
        status: this.booking.status,
        notes: this.booking.notes ?? '',
      },
      { emitEvent: true }, // para que valueChanges se entere
    );
  }

  checkIn = toSignal(
    this.editForm.get('checkIn')!.valueChanges.pipe(
      startWith(this.editForm.get('checkIn')!.value),
      map((v) => String(v ?? '')),
    ),
    { initialValue: String(this.editForm.get('checkIn')!.value ?? '') },
  );

  checkOut = toSignal(
    this.editForm.get('checkOut')!.valueChanges.pipe(
      startWith(this.editForm.get('checkOut')!.value),
      map((v) => String(v ?? '')),
    ),
    { initialValue: String(this.editForm.get('checkOut')!.value ?? '') },
  );

  people = toSignal(
    this.editForm.get('people')!.valueChanges.pipe(
      startWith(this.editForm.get('people')!.value),
      map((v) => Number(v ?? 1)),
    ),
    { initialValue: Number(this.editForm.get('people')!.value ?? 1) },
  );

  pricePerPerson = toSignal(
    this.editForm.get('pricePerPerson')!.valueChanges.pipe(
      startWith(this.editForm.get('pricePerPerson')!.value),
      map((v) => Number(v ?? 0)),
    ),
    { initialValue: Number(this.editForm.get('pricePerPerson')!.value ?? 0) },
  );

  deposit = toSignal(
    this.editForm.get('deposit')!.valueChanges.pipe(
      startWith(this.editForm.get('deposit')!.value),
      map((v) => Number(v ?? 0)),
    ),
    { initialValue: Number(this.editForm.get('deposit')!.value ?? 0) },
  );

  nights = computed(() => this.calc.calcNights(this.checkIn(), this.checkOut()));
  days = computed(() => this.calc.calcDays(this.checkIn(), this.checkOut()));
  priceNight = computed(() => this.calc.calcPriceNight(this.pricePerPerson(), this.people()));
  total = computed(() => this.calc.calcTotal(this.priceNight(), this.nights()));
  remaining = computed(() => this.calc.calcRemaining(this.total(), this.deposit()));
}
