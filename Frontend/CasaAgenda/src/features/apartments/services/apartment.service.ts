import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apartment } from '../models/apartment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>('http://localhost:8080/apartment');
  }
}
