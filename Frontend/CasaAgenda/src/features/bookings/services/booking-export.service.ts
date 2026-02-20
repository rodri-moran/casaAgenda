import { Injectable } from '@angular/core';
import { Apartment } from '../../apartments/models/apartment.model';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingExportService {
  constructor() {}
  buildText(booking: Booking, apartment: Apartment) {}
  downloadPdf(booking: Booking, apartment: Apartment) {}
  downloadImage(booking: Booking, apartment: Apartment) {}
  openWhatsapp(booking: Booking, phone?: number) {}
}
