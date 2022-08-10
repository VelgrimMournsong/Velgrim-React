import { RxObservable } from './rxObservable';
import { RxPartialTopic } from './rxPartialTopic';
import { RxTopic } from './rxTopic';

/**
 * Rx Event abstraction that can emit values and be subscribed to.
 */
export interface RxEvent<T> extends RxObservable<T>, RxTopic<T> {
    /**
     * @param initialState Object to merge a partial payload onto if no values have been emitted.
     * @return A topic that accepts partial payloads and merges them onto the last value emitted (if available) or the initialState.
     */
    usePartial(initialState: T): RxPartialTopic<T>;
}