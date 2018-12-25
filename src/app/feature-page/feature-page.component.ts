import { Component } from '@angular/core';
import { CounterService, CounterConfig } from '../services/counter.service';

@Component({
  selector: 'app-feature-page',
  templateUrl: './feature-page.component.html',
  styleUrls: ['./feature-page.component.css'],
  providers: [
    { provide: CounterConfig, useValue: { initialValue: 100, increment: 10 } },
    CounterService
  ],
})
export class FeaturePageComponent {}
