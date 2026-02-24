import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AvailabilityResultsComponent } from '../../availability-results/availability-results/availability-results.component';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AvailabilityService } from '../../../services/availability.service';

@Component({
  selector: 'app-availability-filters',
  templateUrl: './availability-filters.component.html',
  styleUrls: ['./availability-filters.component.css'],
  imports: [AvailabilityResultsComponent, ReactiveFormsModule],
})
export class AvailabilityFiltersComponent implements OnInit {
  @Output() datesChange = new EventEmitter<{ checkIn: string; checkOut: string }>();

  private fb = inject(FormBuilder);
  form = this.fb.group({
    checkIn: [''],
    checkOut: [''],
  });

  checkInValue = '';
  checkOutValue = '';

  constructor() {}

  ngOnInit() {
    this.form.valueChanges.subscribe((v) => {
      this.checkInValue = v.checkIn ?? '';
      this.checkOutValue = v.checkOut ?? '';
    });
  }

  openDatePicker(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const sp = (input as any).showPicker;
    if (typeof sp === 'function') sp.call(input);
  }

  blockTyping(e: KeyboardEvent) {
    const allowed = ['Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

    if (allowed.includes(e.key)) return;

    if (e.altKey && e.key === 'ArrowDown') return;

    e.preventDefault();
  }
}
