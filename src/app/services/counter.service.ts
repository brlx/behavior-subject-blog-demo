import { Injectable } from '@angular/core';

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

@Injectable()
export class CounterService {

  private counterEvents = new BehaviorSubject<CounterEvent>({ reset: true });
  public counterValue: Observable<number> = this.counterEvents.asObservable().pipe(
    scan((acc: number, event: CounterEvent): number => {
      return event.reset 
        ? INITIAL_VALUE
        : (acc || INITIAL_VALUE) + event.increment;
    }, INITIAL_VALUE),
    shareReplay(),
  );

  increment(): void {
    this.counterEvents.next({ increment: INCREMENT });
  }

  decrement(): void {
    this.counterEvents.next({ increment: INCREMENT * -1 });
  }

  /** Resets the count to the initial value */
  resetCount(): void {
    this.counterEvents.next({ reset: true });
  }
}
