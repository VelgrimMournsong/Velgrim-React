import { createImmutableClone, createUniqueId } from '@velgrim/core';
import { Subject } from 'rxjs';
import { RxEvent } from '../abstractions/rxEvent';
import { RxEventsContext } from '../abstractions/rxEventsContext';
import { useSubscription } from '../hooks/useSubscription';
import { _store } from '../internal/global/_store';
import { _RxEvent } from '../internal/models/_rxEvent';
import { _createEventsContext } from '../internal/util/_createEventsContext';
import { RxEventFactory } from '../types/rxEventFactory';

const eventScopes = new Map<string, any>();

// TODO: improve comments
/**
 * This uses a static store instead of an <EventsProvider /> and is less efficient as a result.
 * @param configureEvents
 * @return useEvents() hook
 */
export function createEventScope<TEvents>(
    configureEvents: (rx: RxEventFactory) => TEvents
): () => RxEventsContext<TEvents> {
    const id = createUniqueId();
    const entries: { key: string, subject: Subject<any> }[] = [];

    function createEvent<T>(initialState?: T): RxEvent<T> {
        const key = createUniqueId();
        const subject = new Subject<any>();
        entries.push({ key, subject });
        _store.set(key, createImmutableClone(initialState));
        return new _RxEvent<any>(key, subject);
    }

    const events = configureEvents(createEvent);
    eventScopes.set(id, _createEventsContext(events));

    return () => {
        for (const { key, subject } of entries) {
            useSubscription(subject, (value: any) => _store.set(key, createImmutableClone(value)), []);
        }

        return eventScopes.get(id) as RxEventsContext<TEvents>;
    };
}

// TODO: add createEventScopeUnsafe()