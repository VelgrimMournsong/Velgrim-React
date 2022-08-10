import { useContext } from 'react';
import { createDefaultContext } from '@velgrim/core';
import { RxEventsContext } from '../abstractions/rxEventsContext';
import { useEvent } from '../hooks/useEvent';
import { _createEventsContext } from '../internal/util/_createEventsContext';
import { RxEventsProvider } from '../types/rxEventsProvider';

/**
 * Pass in an array of event names will be used as the property names for each event
 * on the events object that is returned.
 * @return A useEvents hook which accesses returns the configured events object
 * and a WithEvents higher order component that must be used to wrap a component
 * with the Context Provider that contains the events object.
 * The useEvents hook will only work inside the tree of a component wrapped using WithEvents.
 */
export function createEventsUnsafe<TEvents = any>(
    eventNames: (keyof TEvents)[]
): [() => RxEventsContext<TEvents>, RxEventsProvider];

/**
 * Pass in an object to use as the initial state, each property will be wrapped in an event,
 * the object returned is an events object with those events under the same property names.
 * @return A useEvents hook which accesses returns the configured events object
 * and a WithEvents higher order component that must be used to wrap a component
 * with the Context Provider that contains the events object.
 * The useEvents hook will only work inside the tree of a component wrapped using WithEvents.
 */
export function createEventsUnsafe<TEvents = any, TState = { [event in keyof TEvents]: any }>(
    initialState: TState
): [() => RxEventsContext<TEvents>, RxEventsProvider];

export function createEventsUnsafe<TEvents = any, TState = { [event in keyof TEvents]: any }>(
    p1: (keyof TEvents)[] | TState
): [() => RxEventsContext<TEvents>, RxEventsProvider] {
    const context = createDefaultContext<RxEventsContext<TEvents>>();

    const useEvents = () => {
        const ctx = useContext(context);

        if (!ctx) {
            throw new Error('useEvents must be used within <EventsProvider></EventsProvider>');
        }

        return ctx;
    };

    const EventsProvider: RxEventsProvider = ({ children }) => {
        const events: any = {};

        if (Array.isArray(p1)) {
            const eventNames = p1 as (keyof TEvents)[];

            for (const eventName of eventNames) {
                events[eventName] = useEvent();
            }
        }
        else {
            const initialState = p1 as TState;

            for (const [eventName, eventInitialState] of Object.entries(initialState)) {
                events[eventName] = useEvent(eventInitialState);
            }
        }

        const ctx = _createEventsContext(events);

        return (
            <context.Provider value={ctx}>
                {children}
            </context.Provider>
        );
    };

    return [useEvents, EventsProvider];
}