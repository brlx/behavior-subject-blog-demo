import { Component } from '@angular/core';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  constructor(private counter: CounterService) { }

  currentCount: number;

  increment(): void {
    this.counter.increment();
  }

  decrement(): void {
    this.counter.decrement();
  }

  reset(): void {
    this.counter.resetCount();
  }

}
