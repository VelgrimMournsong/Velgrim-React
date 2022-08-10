import { RxEvent } from '../abstractions/rxEvent';

export type RxEventFactory = <T>(initialState?: T) => RxEvent<T>;