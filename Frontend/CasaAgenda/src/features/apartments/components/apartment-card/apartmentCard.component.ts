import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Apartment } from '../../models/apartment.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-apartment-card',
  styleUrls: ['./apartmentCard.component.css'],
  imports: [CommonModule],
  template: `<div class="card apartment-card">
    @if (apartment.imageUrl) {
      <img class="card-img-top apartment-image" [src]="apartment.imageUrl" alt="" />
    } @else {
      <div class="apartment-image apartment-image--empty">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10.5" r="1.5" />
          <path d="M21 16l-5-5-9 8" />
        </svg>
        <span>Sin foto</span>
      </div>
    }

    <h2 class="card-title">{{ apartment.name }}</h2>

    @if (apartment.description) {
      <p class="card-text">{{ apartment.description }}</p>
    }

    <p class="apartment-capacity">Hasta {{ apartment.capacity }} personas</p>

    <button class="btn btn-primary" (click)="open.emit(apartment!.id)">Ver sus reservas</button>
  </div>`,
})
export class ApartmentCardComponent implements OnInit {
  @Input() apartment!: Apartment;
  @Output() open = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
}
