import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingResponseDto } from '../dtos/bookingResponseDto';
import { Observable } from 'rxjs';
import { Status } from '../enum/status';
import { BookingCreateDto } from '../dtos/bookingCreateDto';
import { BookingUpdateDto } from '../dtos/boookingUpdateDto';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getByStatus(statuses: Status[]): Observable<BookingResponseDto[]> {
    const params = { statuses: statuses };
    return this.http.get<BookingResponseDto[]>('http://localhost:8080/booking', { params });
  }

  create(dto: BookingCreateDto): Observable<BookingResponseDto> {
    return this.http.post<BookingResponseDto>('http://localhost:8080/booking', dto);
  }

  update(id: number, dto: BookingUpdateDto): Observable<BookingResponseDto> {
    return this.http.patch<BookingResponseDto>(`http://localhost:8080/booking/${id}`, dto);
  }

  cancel(id: number): Observable<BookingResponseDto> {
    return this.http.patch<BookingResponseDto>(`http://localhost:8080/booking/${id}/cancel`, {});
  }
}
