import { Component, OnInit } from '@angular/core';
import { AvailabilityFiltersComponent } from '../../../components/availability-filters/availability-filters/availability-filters.component';

@Component({
  selector: 'app-availability-page',
  templateUrl: './availability-page.component.html',
  styleUrls: ['./availability-page.component.css'],
  imports: [AvailabilityFiltersComponent],
})
export class AvailabilityPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
