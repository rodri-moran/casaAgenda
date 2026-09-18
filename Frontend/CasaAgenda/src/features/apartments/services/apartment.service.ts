import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment.model';
import { Observable } from 'rxjs';
import { ApartmentResponseDto } from '../models/apartmentResponseDto';
import { ApartmentCreateDto } from '../models/apartmentCreateDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  private baseUrl = `${environment.apiUrl}/apartment`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApartmentResponseDto[]> {
    return this.http.get<ApartmentResponseDto[]>(this.baseUrl);
  }

  create(dto: ApartmentCreateDto): Observable<ApartmentResponseDto> {
    return this.http.post<ApartmentResponseDto>(this.baseUrl, dto);
  }
}
