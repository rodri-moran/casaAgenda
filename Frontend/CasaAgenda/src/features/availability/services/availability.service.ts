import { inject, Injectable } from '@angular/core';
import { ApartmentResponseDto } from '../../apartments/models/apartmentResponseDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/apartment`;
  constructor() {}
  getAvailableApartments(checkIn: string, checkOut: string): Observable<ApartmentResponseDto[]> {
    return this.http.get<ApartmentResponseDto[]>(`${this.baseUrl}/available`, {
      params: {
        checkIn,
        checkOut,
      },
    });
  }
}
