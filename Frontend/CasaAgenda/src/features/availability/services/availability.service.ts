import { inject, Injectable } from '@angular/core';
import { ApartmentResponseDto } from '../../apartments/models/apartmentResponseDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private http = inject(HttpClient);
  constructor() {}
  getAvailableApartments(checkIn: string, checkOut: string): Observable<ApartmentResponseDto[]> {
    return this.http.get<ApartmentResponseDto[]>('http://localhost:8080/apartment/available', {
      params: {
        checkIn,
        checkOut,
      },
    });
  }
}
