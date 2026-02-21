import { Component, OnInit } from '@angular/core';
import { Apartment } from '../../../../apartments/models/apartment.model';
import { CommonModule } from '@angular/common';
import { ApartmentCardComponent } from '../../../../apartments/components/apartment-card/apartmentCard.component';

@Component({
  selector: 'app-availability-results',
  templateUrl: './availability-results.component.html',
  styleUrls: ['./availability-results.component.css'],
  imports: [CommonModule, ApartmentCardComponent],
})
export class AvailabilityResultsComponent implements OnInit {
  test = true;

  apartments: Apartment[] = [];

  constructor() {}

  ngOnInit(): void {
    this.apartments = [
      {
        id: 1,
        name: 'Departamento Centro',
        description: 'Monoambiente a 2 cuadras de la peatonal',
        capacity: 3,
        imageUrl: 'https://picsum.photos/400/250?random=1',
      },
      {
        id: 2,
        name: 'Departamento Cascada',
        description: 'Departamento a 2 cuadras de la cascada',
        capacity: 5,
        imageUrl: 'https://picsum.photos/400/250?random=2',
      },
      {
        id: 3,
        name: 'Departamento test',
        description: 'Monoambiente a 2 cuadras de la peatonal',
        capacity: 3,
        imageUrl: 'https://picsum.photos/400/250?random=4',
      },
      {
        id: 4,
        name: 'Departamento test 2',
        description: 'Monoambiente a 2 cuadras de la peatonal',
        capacity: 3,
        imageUrl: 'https://picsum.photos/400/250?random=5',
      },
    ];
  }
}
