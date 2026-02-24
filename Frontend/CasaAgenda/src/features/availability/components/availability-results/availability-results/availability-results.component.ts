import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Apartment } from '../../../../apartments/models/apartment.model';
import { CommonModule } from '@angular/common';
import { ApartmentCardComponent } from '../../../../apartments/components/apartment-card/apartmentCard.component';
import { ApartmentResponseDto } from '../../../../apartments/models/apartmentResponseDto';
import { AvailabilityService } from '../../../services/availability.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-availability-results',
  templateUrl: './availability-results.component.html',
  styleUrls: ['./availability-results.component.css'],
  imports: [CommonModule, ApartmentCardComponent],
})
export class AvailabilityResultsComponent implements OnInit {
  @Input() checkIn = '';
  @Input() checkOut = '';
  apartments: ApartmentResponseDto[] | null = null;
  private service = inject(AvailabilityService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!('checkIn' in changes) && !('checkOut' in changes)) return;

    if (!this.checkIn || !this.checkOut) return;

    this.service.getAvailableApartments(this.checkIn, this.checkOut).subscribe({
      next: (list) => (this.apartments = list),
      error: (err) => {
        console.error(err);
        this.apartments = null;
      },
    });
  }

  goToBookings(apartmentId: number) {
    this.router.navigate(['/reservas'], {
      queryParams: { depto: apartmentId },
    });
  }
}
