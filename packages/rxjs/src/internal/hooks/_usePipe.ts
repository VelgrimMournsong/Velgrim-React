import { createImmutableClone, useFunctionOnce } from '@velgrim/core';
import { DependencyList, useId, useMemo } from 'react';
import { Observable, OperatorFunction, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { RxObservable } from '../../abstractions/rxObservable';
import { _store } from '../global/_store';
import { _RxObservable } from '../models/_rxObservable';
import { _reduceOperators } from '../util/_reduceOperators';

export function _usePipe<T>(
    sourceKey: string,
    observable: Observable<T>,
    operators: OperatorFunction<any, any>[],
    dependencies: DependencyList | undefined
): RxObservable<T> {
    const key = useId();
    const combinedOperator = useMemo(() => _reduceOperators(operators), dependencies);

    useFunctionOnce(() => {
        const subject = new Subject<any>();
        subject.pipe(combinedOperator).pipe(first()).subscribe(value => _store.set(key, createImmutableClone(value)));
        const initialState = _store.get(sourceKey);
        subject.next(initialState);
    });

    return new _RxObservable<T>(key, observable.pipe(combinedOperator));
}