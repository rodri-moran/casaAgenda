/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvailabilityResultsComponent } from './availability-results.component';

describe('AvailabilityResultsComponent', () => {
  let component: AvailabilityResultsComponent;
  let fixture: ComponentFixture<AvailabilityResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
