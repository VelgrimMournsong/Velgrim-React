import { useStaticCallback } from '@velgrim/core';
import { RxEvent } from '../abstractions/rxEvent';
import { RxEventFactory } from '../types/rxEventFactory';
import { cast } from '@velgrim/core';
import { useEvent } from './useEvent';

/**
 * Use the event factory to create an object containing one or more events.
 * @return A singleton instance of the configured events object.
 */
export function useEventFactory<TEvents>(configureEvents: (rx: RxEventFactory) => TEvents): TEvents {
    const events: any = {};
    const configuredEvents = useStaticCallback(configureEvents)(<T>(initialState?: T) => cast<RxEvent<T>>(initialState));

    for (const [eventName, initialState] of Object.entries(configuredEvents)) {
        events[eventName] = useEvent(initialState);
    }

    return events;
}