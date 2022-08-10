import { useSingleton } from '@velgrim/core';
import { Subject } from 'rxjs';
import { RxEvent } from '../../abstractions/rxEvent';
import { RxPartialTopic } from '../../abstractions/rxPartialTopic';
import { useSubscription } from '../../hooks/useSubscription';
import { _RxObservable } from './_rxObservable';
import { _RxPartialTopic } from './_rxPartialTopic';
import { _store } from '../global/_store';

export class _RxEvent<T> extends _RxObservable<T> implements RxEvent<T> {
    constructor(
        key: string,
        protected subject: Subject<T>
    ) {
        super(key, subject);
    }

    dispatch(value: T): void {
        this.subject.next(value);
    }

    patch(partialValue: Partial<T>): void {
        this.subject.next(_store.has(this.key) ? { ..._store.get(this.key), ...partialValue } : partialValue as T);
    }

    usePartial(): RxPartialTopic<T> {
        const partialSubject = useSingleton(() => new Subject<Partial<T>>());
        const { key, subject } = this;

        useSubscription(partialSubject, _value => {
            subject.next(_store.has(key) ? { ..._store.get(key), ..._value } : _value as T);
        }, []);

        return new _RxPartialTopic(key, partialSubject);
    }
}