import { Component, OnInit, signal, inject, Input, computed, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateRangeValidator } from '../../../../../shared/validators/dateRangeValidator';
import { Apartment } from '../../../../apartments/models/apartment.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingCalculatorService } from '../../../services/booking-calculator.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-booking-form-modal',
  templateUrl: './booking-form-modal.component.html',
  styleUrls: ['./booking-form-modal.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class BookingFormModalComponent implements OnInit {
  @Input() apartments!: Apartment[];

  ngOnInit() {}
  step = signal<1 | 2>(1);

  goNext() {
    console.log('precio por noche de form:', this.bookingForm.get('priceNight')?.value);
    this.bookingForm.markAllAsTouched();
    if (this.bookingForm.invalid) return;
    this.step.set(2);
  }

  goBack() {
    this.step.set(1);
  }
  private fb = inject(FormBuilder);

  bookingForm = this.fb.group(
    {
      apartmentId: [null, [Validators.required, Validators.min(1)]],
      checkIn: ['', [Validators.required]],
      checkOut: ['', [Validators.required]],
      guestName: ['', [Validators.required, Validators.maxLength(100)]],
      people: [1, [Validators.required, Validators.min(1)]],
      deposit: [0, [Validators.required, Validators.min(0)]],
      pricePerPerson: [0, [Validators.required, Validators.min(0)]],
      // remaining: [0, [Validators.required, Validators.min(0)]],
      status: ['pending'],
      // calculados:
      priceNight: [{ value: 0, disabled: true }],
      nights: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      remaining: [{ value: 0, disabled: true }],

      notes: ['', [Validators.maxLength(300)]],
    },
    {
      validators: dateRangeValidator(),
    },
  );

  clearForm() {
    this.step.set(1);
    this.bookingForm.reset();
  }

  get summary() {
    const v = this.bookingForm.getRawValue();
    const aptId = Number(v.apartmentId);
    const aptName = this.apartments.find((a) => a.id === aptId)?.name ?? '—';
    return {
      apartment: aptName,
      checkIn: v.checkIn,
      checkOut: v.checkOut,
      nights: v.nights,
      guest: v.guestName,
      people: v.people,
      pricePerPerson: v.pricePerPerson,
      total: v.total,
      deposit: v.deposit,
      remaining: v.remaining,
    };
  }
  nights = computed(() => this.calculator.calcNights(this.checkIn(), this.checkOut()));
  days = computed(() => this.calculator.calcDays(this.checkIn(), this.checkOut()));

  // toSignal convierte un observable en un signal
  pricePerPerson = toSignal(
    // valueChanges es un Observable
    // con pipe transformamos el Observable
    this.bookingForm.get('pricePerPerson')!.valueChanges.pipe(
      // valueChanges NO emite el valor inicial, entonces con startWith hacemos que
      // antes de que escuche cambios mande primero el valor actual
      startWith(this.bookingForm.get('pricePerPerson')!.value),
      map((v) => Number(v ?? 0)),
    ),
    { initialValue: 0 },
  );

  // Signal que refleja en tiempo real el valor del input pricePerPerson
  // Convierte valueChanges (Observable) a Signal
  // Incluye el valor inicial del formulario
  // Normaliza null/undefined a 0
  people = toSignal(
    this.bookingForm.get('people')!.valueChanges.pipe(
      startWith(this.bookingForm.get('people')!.value),
      map((v) => Number(v ?? 1)),
    ),
    { initialValue: 1 },
  );

  deposit = toSignal(
    this.bookingForm.get('deposit')!.valueChanges.pipe(
      startWith(this.bookingForm.get('deposit')!.value),
      map((v) => Number(v ?? 0)),
    ),
    { initialValue: 0 },
  );

  checkIn = toSignal(
    this.bookingForm.get('checkIn')!.valueChanges.pipe(
      startWith(this.bookingForm.get('checkIn')!.value),
      map((v) => String(v ?? '')),
    ),
    { initialValue: '' },
  );

  checkOut = toSignal(
    this.bookingForm.get('checkOut')!.valueChanges.pipe(
      startWith(this.bookingForm.get('checkOut')!.value),
      map((v) => String(v ?? '')),
    ),
    { initialValue: '' },
  );

  priceNight = computed(() => this.calculator.calcPriceNight(this.pricePerPerson(), this.people()));
  total = computed(() => this.calculator.calcTotal(this.priceNight(), this.nights()));
  remaining = computed(() => this.calculator.calcRemaining(this.total(), this.deposit()));

  constructor(private calculator: BookingCalculatorService) {}
}
