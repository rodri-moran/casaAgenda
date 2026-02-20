import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Booking } from '../../../models/booking.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs';
import { dateRangeValidator } from '../../../../../shared/validators/dateRangeValidator';
import { BookingCalculatorService } from '../../../../../shared/services/booking-calculator.service';

@Component({
  selector: 'app-booking-edit-modal',
  templateUrl: './booking-edit-modal.component.html',
  styleUrls: ['./booking-edit-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class BookingEditModalComponent implements OnInit {
  @Input() booking: Booking | null = null;
  private fb = inject(FormBuilder);

  editForm = this.fb.group(
    {
      apartmentId: [-1, [Validators.required, Validators.min(1)]],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      guestName: ['', [Validators.required, Validators.maxLength(100)]],
      people: [1, [Validators.required, Validators.min(1)]],
      deposit: [0, [Validators.required, Validators.min(0)]],
      pricePerPerson: [0, [Validators.required, Validators.min(0)]],
      status: ['pending'],

      // calculados
      priceNight: [{ value: 0, disabled: true }],
      nights: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      remaining: [{ value: 0, disabled: true }],

      notes: ['', [Validators.maxLength(300)]],
    },
    { validators: dateRangeValidator() },
  );

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
