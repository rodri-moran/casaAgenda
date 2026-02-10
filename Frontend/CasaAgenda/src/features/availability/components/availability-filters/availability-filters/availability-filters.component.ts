import { Component, OnInit } from '@angular/core';
import { AvailabilityResultsComponent } from '../../availability-results/availability-results/availability-results.component';

@Component({
  selector: 'app-availability-filters',
  templateUrl: './availability-filters.component.html',
  styleUrls: ['./availability-filters.component.css'],
  imports: [AvailabilityResultsComponent],
})
export class AvailabilityFiltersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
