/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApartmentService } from './apartment.service';

describe('Service: Apartment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApartmentService]
    });
  });

  it('should ...', inject([ApartmentService], (service: ApartmentService) => {
    expect(service).toBeTruthy();
  }));
});
