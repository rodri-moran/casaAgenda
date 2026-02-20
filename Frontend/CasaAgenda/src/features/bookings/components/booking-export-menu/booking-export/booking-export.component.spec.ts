/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookingExportComponent } from './booking-export.component';

describe('BookingExportComponent', () => {
  let component: BookingExportComponent;
  let fixture: ComponentFixture<BookingExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
