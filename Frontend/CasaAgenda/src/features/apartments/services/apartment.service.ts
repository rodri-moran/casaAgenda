import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment.model';
import { Observable } from 'rxjs';
import { ApartmentResponseDto } from '../models/apartmentResponseDto';
import { ApartmentCreateDto } from '../models/apartmentCreateDto';
@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApartmentResponseDto[]> {
    return this.http.get<ApartmentResponseDto[]>('http://localhost:8080/apartment');
  }

  create(dto: ApartmentCreateDto): Observable<ApartmentResponseDto> {
    return this.http.post<ApartmentResponseDto>('http://localhost:8080/apartment', dto);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8080/apartment/upload', formData, {
      responseType: 'text',
    });
  }
}
