/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AvailabilityPageComponent } from './availability-page.component';

describe('AvailabilityPageComponent', () => {
  let component: AvailabilityPageComponent;
  let fixture: ComponentFixture<AvailabilityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
