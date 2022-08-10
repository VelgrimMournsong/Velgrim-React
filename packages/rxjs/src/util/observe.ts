import { from, OperatorFunction } from 'rxjs';
import { first } from 'rxjs/operators';
import { SubscribeOptions } from '../types/subscribeOptions';
import { _reduceOperators } from '../internal/util/_reduceOperators';

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: OperatorFunction<T, T> }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, T>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C, D>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C, D, E>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C, D, E, F>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C, D, E, F, G>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C, D, E, F, G, H>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>, OperatorFunction<G, H>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C, D, E, F, G, H, I>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>, OperatorFunction<G, H>, OperatorFunction<H, I>] }): void;

/**
 * Configure promise result handling using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T, A, B, C, D, E, F, G, H, I>(promise: Promise<T>, options: SubscribeOptions<T> & { pipe?: [OperatorFunction<T, A>, OperatorFunction<A, B>, OperatorFunction<B, C>, OperatorFunction<C, D>, OperatorFunction<D, E>, OperatorFunction<E, F>, OperatorFunction<F, G>, OperatorFunction<G, H>, OperatorFunction<H, I>, ...OperatorFunction<any, any>[]] }): void;


/**
 * Handle the result of a promise using RxJS.
 * @param promise A promise.
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * An array of RxJS operators can be provided via the pipe property.
 */
export function observe<T>(
    promise: Promise<T>,
    options: SubscribeOptions<any> & { pipe?: OperatorFunction<any, any> | OperatorFunction<any, any>[] }
): void {
    const observable = from(promise);

    if (!options.pipe) {
        observable.pipe(first()).subscribe(options as any);
    }
    else {
        if (!Array.isArray(options.pipe)) {
            options.pipe = [options.pipe];
        }

        const reducedOperatorFn = _reduceOperators([...options.pipe, first()]);
        observable.pipe(reducedOperatorFn).subscribe(options as any);
    }
}