/**
 * Rx Event abstraction that can emit values, but cannot be subscribed to.
 */
export interface RxPartialTopic<T> {
    /**
     * Emits the provided value as an event, triggering each subscriber's callback function.
     * If no values have been emitted yet, the partial payload is merged onto the initialState and the resulting object is emitted.
     * Otherwise, the partial payload is merged onto the last value emitted and the resulting object is emitted.
     *
     * @param value Event payload.
     */
    dispatch(value: Partial<T>): void;
}