/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApartmentCardComponent } from '../components/apartment-card/apartmentCard/apartmentCard.component';

describe('ApartmentCardComponent', () => {
  let component: ApartmentCardComponent;
  let fixture: ComponentFixture<ApartmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
