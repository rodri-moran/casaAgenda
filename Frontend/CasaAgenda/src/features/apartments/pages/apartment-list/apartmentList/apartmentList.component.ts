import { Component, OnInit } from '@angular/core';
import { Apartment } from '../../../models/apartment.model';
import { ApartmentCardComponent } from '../../../components/apartment-card/apartmentCard.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApartmentService } from '../../../services/apartment.service';
@Component({
  selector: 'app-apartmentList',
  templateUrl: './apartmentList.component.html',
  styleUrls: ['./apartmentList.component.css'],
  imports: [ApartmentCardComponent, CommonModule, RouterLink],
})
export class ApartmentListComponent implements OnInit {
  apartments: Apartment[] = [];
  constructor(
    private router: Router,
    private service: ApartmentService,
  ) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      console.log(data);
      this.apartments = data;
    });
  }

  goToBookings(apartmentId: number) {
    this.router.navigate(['/reservas'], {
      queryParams: { depto: apartmentId },
    });
  }
}
