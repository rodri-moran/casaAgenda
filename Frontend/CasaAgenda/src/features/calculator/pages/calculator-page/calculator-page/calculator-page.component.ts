import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';
import { BookingCalculatorService } from '../../../../../shared/services/booking-calculator.service';
import { CommonModule } from '@angular/common';

interface CalculatorModel {
  nights: number;
  people: number;
  pricePerPerson: number;
  discount: number;
}

@Component({
  selector: 'app-calculator-page',
  templateUrl: './calculator-page.component.html',
  styleUrls: ['./calculator-page.component.css'],
  imports: [CommonModule, FormField],
})
export class CalculatorPageComponent implements OnInit {
  constructor(private calculator: BookingCalculatorService) {}
  ngOnInit() {}

  // 1) modelo base del form

  model = signal<CalculatorModel>({
    nights: 1,
    people: 1,
    pricePerPerson: 0,
    discount: 0,
  });

  // 2) arbol de campos (para bindear con [formField])
  calcForm = form(this.model, (s) => {
    required(s.nights, { message: 'Indicá noches' });
    min(s.nights, 1, { message: 'Mínimo 1 noche' });

    required(s.people, { message: 'Indicá personas' });
    min(s.people, 1, { message: 'Mínimo 1 persona' });

    required(s.pricePerPerson, { message: 'Indicá precio por persona' });
    min(s.pricePerPerson, 0, { message: 'No puede ser negativo' });

    required(s.discount, { message: 'Indicá depósito o descuento (0 si no hay)' });
    min(s.discount, 0, { message: 'No puede ser negativo' });
  });

  // 3) Computed de resultados (leen de field state)
  // nights = computed(() => Number(this.calcForm.nights().value() ?? 1));
  nights = computed(() => {
    const v = this.calcForm.nights().value();
    return isNaN(v) ? 0 : v;
  });

  //  people = computed(() => Number(this.calcForm.people().value() ?? 1));
  people = computed(() => {
    const v = this.calcForm.people().value();
    return isNaN(v) ? 0 : v;
  });

  // pricePerPerson = computed(() => Number(this.calcForm.pricePerPerson().value() ?? 0));
  pricePerPerson = computed(() => {
    const v = this.calcForm.pricePerPerson().value();
    return isNaN(v) ? 0 : v;
  });

  // discount = computed(() => Number(this.calcForm.discount().value() ?? 0));
  discount = computed(() => {
    const v = this.calcForm.discount().value();
    return isNaN(v) ? 0 : v;
  });

  priceNight = computed(() => this.calculator.calcPriceNight(this.pricePerPerson(), this.people()));
  total = computed(() => this.calculator.calcTotal(this.priceNight(), this.nights()));
  remaining = computed(() => this.calculator.calcRemaining(this.total(), this.discount()));
}
