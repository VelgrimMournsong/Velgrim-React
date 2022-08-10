import { areCongruent, combine } from '@velgrim/core';
import { useState } from 'react';
import { RxEventsContext } from '../../abstractions/rxEventsContext';
import { RxSelector } from '../../abstractions/rxSelector';

export function _createEventsContext<TEvents>(events: TEvents): RxEventsContext<TEvents> {
    function action<T, TEvent>(
        event: keyof TEvents,
        reduce: (state: T, value: TEvent) => T
    ): RxSelector<T, TEvent> {
        return { observable: (events as any)[event], reduce }
    }

    function useReducedState<T>(
        initialState: T | (() => T),
        reducer: (
            action: <TEvent>(event: keyof TEvents, selector: (state: T, value: TEvent) => T) => RxSelector<T, TEvent>
        ) => RxSelector<T, any>[]
    ): T {
        const [state, setState] = useState(initialState);
        const selectors = reducer(action);

        for (const { reduce, observable } of selectors) {
            observable.useSubscription((value: any) => {
                if (!areCongruent(value, state)) {
                    setState(_state => reduce(_state, value));
                }
                else {
                    // TODO:
                    console.log('skipping redundant render in useReducedState()...');
                }
            }, []);
        }

        return state;
    }

    return combine(events)({ useReducedState });
}