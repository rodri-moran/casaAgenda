/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookingCalculatorService } from '../../features/bookings/services/booking-calculator.service';

describe('Service: BookingCalculator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingCalculatorService],
    });
  });

  it('should ...', inject([BookingCalculatorService], (service: BookingCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
