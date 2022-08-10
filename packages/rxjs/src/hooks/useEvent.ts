import { useId } from 'react';
import { Subject } from 'rxjs';
import { RxEvent } from '../abstractions/rxEvent';
import { _RxEvent } from '../internal/models/_rxEvent';
import { createImmutableClone, useSingleton } from '@velgrim/core';
import { _store } from '../internal/global/_store';
import { useSubscription } from './useSubscription';

/**
 * Returns an event that can emit values and be subscribed to.
 */
export function useEvent<T = void>(initialState?: T): RxEvent<T> {
    const key = useId();
    const subject = useSingleton(() => new Subject<T>());
    useSubscription(subject, (value: T) => _store.set(key, createImmutableClone(value)), []);

    return useSingleton<RxEvent<T>>(() => {
        _store.set(key, createImmutableClone(initialState));
        return new _RxEvent<T>(key, subject);
    });
}