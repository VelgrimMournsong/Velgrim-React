import { Subject } from 'rxjs';
import { RxPartialTopic } from '../../abstractions/rxPartialTopic';
import { _store } from '../global/_store';

export class _RxPartialTopic<T> implements RxPartialTopic<T> {
    constructor(
        protected key: string,
        private subject: Subject<Partial<T>>
    ) { }

    dispatch(value: Partial<T>): void {
        this.subject.next(value);
    }

    patch(partialValue: Partial<T>): void {
        this.subject.next(_store.has(this.key) ? { ..._store.get(this.key), ...partialValue } : partialValue as T);
    }
}