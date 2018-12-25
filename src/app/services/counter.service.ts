import { Injectable, Optional } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { scan } from 'rxjs/operators/scan';
import { shareReplay } from 'rxjs/operators/shareReplay';

const INITIAL_VALUE = 0;
const INCREMENT = 1;

interface CounterEvent {
  increment?: number;
  reset?: boolean;
}

export class CounterConfig {
  increment?: number;
  initialValue?: number;
}

@Injectable()
export class CounterService {

  private incrementValue: number;
  private initialValue: number;

  constructor(
    @Optional() maybeConfig: CounterConfig,
  ) {
    const config: CounterConfig = maybeConfig || {};
    this.incrementValue = config.increment || INCREMENT;
    this.initialValue = config.initialValue || INITIAL_VALUE;
  }

  private counterEvents = new BehaviorSubject<CounterEvent>({ reset: true });
  public counterValue: Observable<number> = this.counterEvents.asObservable().pipe(
    scan((acc: number, event: CounterEvent): number => {
      return event.reset 
        ? this.initialValue
        : (acc || this.initialValue) + event.increment;
    }, this.initialValue),
    shareReplay(),
  );

  increment(): void {
    this.counterEvents.next({ increment: this.incrementValue });
  }

  decrement(): void {
    this.counterEvents.next({ increment: this.incrementValue * -1 });
  }

  /** Resets the count to the initial value */
  resetCount(): void {
    this.counterEvents.next({ reset: true });
  }
}
