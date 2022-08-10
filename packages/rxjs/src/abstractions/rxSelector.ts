import { RxObservable } from './rxObservable';

export interface RxSelector<T, TEvent> {
    observable: RxObservable<TEvent>;
    reduce: (state: T, value: TEvent) => T;
}