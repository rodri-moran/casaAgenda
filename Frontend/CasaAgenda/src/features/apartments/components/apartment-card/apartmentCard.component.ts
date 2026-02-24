import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Apartment } from '../../models/apartment.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-apartment-card',
  styleUrls: ['./apartmentCard.Component.css'],
  imports: [CommonModule],
  template: ` <div class="card apartment-card">
    <img
      class="card-img-top apartment-image"
      [src]="apartment.imageUrl"
      alt="Imagen departamento"
    />
    <h5 class="card-title m-1 text-center">{{ apartment.name }}</h5>
    <p class="card-text m-1 text-center">{{ apartment.description }}</p>
    <button class="btn btn-primary" (click)="open.emit(apartment!.id)">Ver reservas</button>
  </div>`,
})
export class ApartmentCardComponent implements OnInit {
  @Input() apartment!: Apartment;
  @Output() open = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
}
