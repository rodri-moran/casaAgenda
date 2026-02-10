import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingCalculatorService {
  constructor() {}

  calcNights(checkIn: string, checkOut: string): number {
    const inStr = checkIn;
    const outStr = checkOut;

    if (!inStr || !outStr) return 0;

    const inDate = new Date(inStr + 'T00:00:00');
    const outDate = new Date(outStr + 'T00:00:00');

    const diffMs = outDate.getTime() - inDate.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  calcDays(checkIn: string, checkOut: string): number {
    const inStr = checkIn;
    const outStr = checkOut;

    if (!inStr || !outStr) return 0;

    const inDate = new Date(inStr + 'T00:00:00');
    const outDate = new Date(outStr + 'T00:00:00');

    const diffMs = outDate.getTime() - inDate.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) + 1;

    return diffDays > 0 ? diffDays : 0;
  }

  calcPriceNight(pricePerPerson: number, people: number): number {
    return pricePerPerson * people;
  }

  calcTotal(priceNight: number, nights: number): number {
    return priceNight * nights;
  }

  calcRemaining(total: number, deposit: number): number {
    return Math.max(total - deposit, 0);
  }
}
