/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookingExportService } from './booking-export.service';

describe('Service: BookingExport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingExportService]
    });
  });

  it('should ...', inject([BookingExportService], (service: BookingExportService) => {
    expect(service).toBeTruthy();
  }));
});
