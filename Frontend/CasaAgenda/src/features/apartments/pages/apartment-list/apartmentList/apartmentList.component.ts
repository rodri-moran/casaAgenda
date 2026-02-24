import { Component, inject, OnInit } from '@angular/core';
import { Apartment } from '../../../models/apartment.model';
import { ApartmentCardComponent } from '../../../components/apartment-card/apartmentCard.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApartmentService } from '../../../services/apartment.service';
import { ChangeDetectorRef } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-apartmentList',
  templateUrl: './apartmentList.component.html',
  styleUrls: ['./apartmentList.component.css'],
  imports: [ApartmentCardComponent, CommonModule, RouterLink],
})
export class ApartmentListComponent implements OnInit {
  //  apartments: Apartment[] = [];
  private service = inject(ApartmentService);
  apartments$ = this.service.getAll().pipe(
    catchError((error) => {
      console.error('Error loading apartments', error);
      return of([]);
    }),
  );

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //  this.service.getAll().subscribe((data) => {
    //    this.apartments = data;
    //     this.cdr.detectChanges();
    //  });
  }
  goToBookings(apartmentId: number) {
    this.router.navigate(['/reservas'], {
      queryParams: { depto: apartmentId },
    });
  }
}
