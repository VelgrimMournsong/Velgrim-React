import { RxSelector } from './rxSelector';

export type RxEventsContext<TEvents> = TEvents & {
    useReducedState<T>(
        initialState: T | (() => T),
        reducer: (
            action: <TEvent>(event: keyof TEvents, selector: (state: T, value: TEvent) => T) => RxSelector<T, TEvent>
        ) => RxSelector<T, any>[]
    ): T;
}