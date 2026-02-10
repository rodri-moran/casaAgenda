import { Component, OnInit } from '@angular/core';
import { Apartment } from '../../../models/apartment.model';
import { ApartmentCardComponent } from '../../../components/apartment-card/apartmentCard.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-apartmentList',
  templateUrl: './apartmentList.component.html',
  styleUrls: ['./apartmentList.component.css'],
  imports: [ApartmentCardComponent, CommonModule, RouterLink],
})
export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.apartments = [
      {
        id: 1,
        name: 'Departamento Centro',
        description: 'Monoambiente a 2 cuadras de la peatonal',
        capacity: 3,
        imageUrl: 'https://picsum.photos/400/250?random=1',
        pricePerPerson: 11000,
      },
      {
        id: 2,
        name: 'Departamento Cascada',
        description: 'Departamento a 2 cuadras de la cascada',
        capacity: 5,
        imageUrl: 'https://picsum.photos/400/250?random=1',
        pricePerPerson: 10000,
      },
    ];
  }

  goToBookings(apartmentId: number) {
    this.router.navigate(['/reservas'], {
      queryParams: { depto: apartmentId },
    });
  }
}
