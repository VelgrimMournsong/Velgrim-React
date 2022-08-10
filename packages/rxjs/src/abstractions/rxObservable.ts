import { OperatorFunction, PartialObserver } from 'rxjs';
import { DependencyList } from 'react';

/**
 * Rx Event abstraction that can be subscribed to, but cannot be used to emit values.
 */
export interface RxObservable<T> {
    /**
     * Attach an RxJS map operator to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    useMap<TR>(map: (value: T) => TR, dependencies?: DependencyList): RxObservable<TR>;

    /**
     * Attach an RxJS operator to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A>(operators: [OperatorFunction<T, A>], dependencies?: DependencyList): RxObservable<A>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>], dependencies?: DependencyList): RxObservable<B>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>], dependencies?: DependencyList): RxObservable<C>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C, D>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>], dependencies?: DependencyList): RxObservable<D>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C, D, E>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>], dependencies?: DependencyList): RxObservable<E>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C, D, E, F>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>], dependencies?: DependencyList): RxObservable<F>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C, D, E, F, G>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>], dependencies?: DependencyList): RxObservable<G>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C, D, E, F, G, H>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>, OperatorFunction<G, H>], dependencies?: DependencyList): RxObservable<H>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C, D, E, F, G, H, I>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>, OperatorFunction<G, H>, OperatorFunction<H, I>], dependencies?: DependencyList): RxObservable<I>;

    /**
     * Attach RxJS operators to the event
     * @see https://rxjs.dev/api/index/function/pipe
     */
    usePipe<A, B, C, D, E, F, G, H, I>(operators: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>, OperatorFunction<G, H>, OperatorFunction<H, I>, ...OperatorFunction<any, any>[]], dependencies?: DependencyList): RxObservable<{}>;

    /**
     * If no values have been emitted yet, returns the initialState.
     * Otherwise, returns the last value emitted.
     */
    useState(): T;

    /**
     * If no values have been emitted yet, returns the initialState.
     * Otherwise, returns the last value emitted.
     */
    useState(initialState: T): T;

    // TODO: update XML comment
    /**
     * Subscribes to the event.
     * @param sideEffect Callbacks to execute when a value is emitted.
     * @param dependencies Dependency array which should include all variables captured in the callback(s) provided.
     * During a rerender, if an item of this dependency array has changed,
     * the observable is unsubscribed from and a new subscription to the observable is made.
     */
    useSubscription(sideEffect: (value: T) => void, dependencies?: DependencyList): void;

    // TODO: update XML comment
    /**
     * Subscribes to the event.
     * @param observer One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
     * @param dependencies Dependency array which should include all variables captured in the callback(s) provided.
     * During a rerender, if an item of this dependency array has changed,
     * the observable is unsubscribed from and a new subscription to the observable is made.
     */
    useSubscription(observer: PartialObserver<T>, dependencies?: DependencyList): void;
}