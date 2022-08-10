import { useFunctionOnce, useRerender } from '@velgrim/core';
import { map, Observable, OperatorFunction } from 'rxjs';
import { RxObservable } from '../../abstractions/rxObservable';
import { _store } from '../global/_store';
import { _useLogger } from '../hooks/_useLogger';
import { _usePipe } from '../hooks/_usePipe';
import { SubscribeOptions } from '../../types/subscribeOptions';
import { DependencyList } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { areCongruent } from '@velgrim/core';

export class _RxObservable<T> implements RxObservable<T> {
    constructor(
        protected key: string,
        private observable: Observable<T>
    ) { }

    useMap<TR>(mapFn: (value: T) => TR, dependencies?: DependencyList): RxObservable<TR> {
        return this.usePipe([map(mapFn)], dependencies);
    }

    usePipe(
        operators: OperatorFunction<any, any>[],
        dependencies?: DependencyList
    ): RxObservable<any> {
        return  _usePipe(this.key, this.observable, operators, dependencies);
    }

    useState(initialState?: T): T {
        const key = this.key;

        useFunctionOnce(() => {
            if (initialState !== undefined) {
                _store.set(key, initialState)
            }
        });

        const log = _useLogger();
        const rerender = useRerender();

        useSubscription(this.observable, (value: T) => {
            if (!areCongruent(value, _store.get(key))) {
                rerender();
            }
            else {
                log.trace('skipping redundant rerender in useState()...');
            }
        }, []);

        return _store.get(key);
    }

    useSubscription(options: SubscribeOptions<T>, dependencies?: DependencyList): void {
        useSubscription(this.observable, options, dependencies);
    }
}