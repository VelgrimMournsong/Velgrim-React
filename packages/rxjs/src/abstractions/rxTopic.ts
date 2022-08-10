/**
 * Rx Event abstraction that can emit values, but cannot be subscribed to.
 */
export interface RxTopic<T> {
    /**
     * Emits the provided value as an event, triggering each subscriber's callback function.
     */
    dispatch(value: T): void;

    /**
     * Merges the provided value with the last emitted value and emits the result as an event, triggering each subscriber's callback function.
     */
    patch(partialValue: Partial<T>): void;
}