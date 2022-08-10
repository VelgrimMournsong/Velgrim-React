import { DependencyList, EffectCallback, useCallback, useState } from 'react';
import { useDestructor } from './useDestructor';
// import { log } from '@velgrim/testing';

// TODO: remove log statements
export function useFunction(effect: EffectCallback, dependencies?: DependencyList): void {
    const [invoked, setInvoked] = useState(false);
    const destructor = useCallback(!invoked ? effect() : (() => {}) as any, [!invoked ? invoked : true]);

    if (!invoked) {
        // log('setting \'invoked\' to true');
        setInvoked(true);
    }
    else {
        // log('\'invoked\' is true');
    }

    useDestructor(() => {
        if (invoked) {
            // log('setting \'invoked\' to false');
            setInvoked(false);
        }
        else {
            // log('\'invoked\' is false');
        }

        if (destructor) {
            // log('destructing...');
            destructor();
        }
        else {
            // log('destructor is falsy');
        }
    }, dependencies ?? []);
}

/*
import { DependencyList, EffectCallback, useEffect, useState } from 'react';

// TODO: test
export function useInstantEffect(effect: EffectCallback, dependencies?: DependencyList): void {
    const [invoked, setInvoked] = useState(false);
    const destructor = !invoked ? effect() : undefined;

    useEffect(() => {
        setInvoked(true);

        return () => {
            setInvoked(false);

            if (destructor) {
                destructor();
            }
        };
    }, dependencies ?? []);
}
*/

/*
import { DependencyList, EffectCallback, useState } from 'react';
import { useDestructor } from './useDestructor';

// TODO: test
export function useInstantEffect(effect: EffectCallback, dependencies?: DependencyList): void {
    const destructor = effect();

    useDestructor(() => {
        if (destructor) {
            destructor();
        }
    }, dependencies);
}
*/