import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Apartment } from '../../models/apartment.model';

@Component({
  standalone: true,
  selector: 'app-apartment-card',
  styleUrls: ['./apartmentCard.component.css'],
  template: `<article class="apartment-card">
    <div class="apartment-card__top">
      <div class="apartment-card__info">
        <h2 class="apartment-card__name">{{ apartment.name }}</h2>
        <p class="apartment-card__capacity">Hasta {{ apartment.capacity }} personas</p>
      </div>

      <button
        type="button"
        class="apartment-card__edit"
        [attr.aria-label]="'Editar ' + apartment.name"
        (click)="edit.emit(apartment)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 20h4L20 8l-4-4L4 16v4z" />
        </svg>
        Editar
      </button>
    </div>

    <button type="button" class="apartment-card__open" (click)="open.emit(apartment.id)">
      Ver sus reservas
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  </article>`,
})
export class ApartmentCardComponent {
  @Input({ required: true }) apartment!: Apartment;
  @Output() open = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Apartment>();
}
