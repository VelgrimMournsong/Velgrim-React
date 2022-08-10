import { useContext } from 'react';
import { createDefaultContext } from '@velgrim/core';
import { RxEventsContext } from '../abstractions/rxEventsContext';
import { useEventFactory } from '../hooks/useEventFactory';
import { _createEventsContext } from '../internal/util/_createEventsContext';
import { RxEventFactory } from '../types/rxEventFactory';
import { RxEventsProvider } from '../types/rxEventsProvider';

/**
 * Use the event factory to create an object containing one or more events.
 * @return A useEvents hook which accesses returns the configured events object
 * and a WithEvents higher order component that must be used to wrap a component
 * with the Context Provider that contains the events object.
 * The useEvents hook will only work inside the tree of a component wrapped using WithEvents.
 */
export function createEvents<TEvents>(
    configureEvents: (rx: RxEventFactory) => TEvents
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
        const events = useEventFactory(configureEvents);
        const ctx = _createEventsContext(events);

        return (
            <context.Provider value={ctx}>
                {children}
            </context.Provider>
        );
    };

    return [useEvents, EventsProvider];
}