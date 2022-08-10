import { DependencyList, useInsertionEffect } from 'react';
import { Observable } from 'rxjs';
import { _useLogger } from '../internal/hooks/_useLogger';
import { SubscribeOptions } from '../types/subscribeOptions';

// TODO: consider removing logging when lib is stable, which also means removing options.label
/**
 * Subscribes to the observable and automatically unsubscribes/resubscribes using the React lifecycle.
 * @param observable RxJS Observable
 * @param options One or more callbacks to execute when a value is emitted, when an error is thrown, and when an event is complete.
 * @param dependencies Dependency array which should include all variables captured in the callback(s) provided.
 * During a rerender, if an item of this dependency array has changed,
 * the observable is unsubscribed from and a new subscription to the observable is made.
 */
export function useSubscription<T>(
    observable: Observable<T>,
    options: SubscribeOptions<T>,
    dependencies?: DependencyList
): void {
    const log = _useLogger();

    useInsertionEffect(() => {
        const label: string | undefined = (options as any)['label'];
        log.trace(`subscribing to event...${label ? ` (${label})` : ''}`);
        const subscription = observable.subscribe(options as any);

        return () => {
            log.trace(`unsubscribing from event...${label ? ` (${label})` : ''}`);
            subscription.unsubscribe();
        };
    }, dependencies);
}