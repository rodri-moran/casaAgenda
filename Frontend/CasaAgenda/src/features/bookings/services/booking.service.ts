import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingResponseDto } from '../dtos/bookingResponseDto';
import { Observable } from 'rxjs';
import { Status } from '../enum/status';
import { BookingCreateDto } from '../dtos/bookingCreateDto';
import { BookingUpdateDto } from '../dtos/boookingUpdateDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = `${environment.apiUrl}/booking`;

  constructor(private http: HttpClient) {}

  getByStatus(statuses: Status[]): Observable<BookingResponseDto[]> {
    const params = { statuses: statuses };
    return this.http.get<BookingResponseDto[]>(this.baseUrl, { params });
  }

  create(dto: BookingCreateDto): Observable<BookingResponseDto> {
    return this.http.post<BookingResponseDto>(this.baseUrl, dto);
  }

  update(id: number, dto: BookingUpdateDto): Observable<BookingResponseDto> {
    return this.http.patch<BookingResponseDto>(`${this.baseUrl}/${id}`, dto);
  }

  cancel(id: number): Observable<BookingResponseDto> {
    return this.http.patch<BookingResponseDto>(`${this.baseUrl}/${id}/cancel`, {});
  }
}
