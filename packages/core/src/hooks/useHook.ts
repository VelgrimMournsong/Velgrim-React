import { DependencyList, EffectCallback } from 'react';
import { useFunction } from './useFunction';

// TODO: test
export function useHook(useHook: () => EffectCallback, dependencies?: DependencyList): void {
    // const [invoked, setInvoked] = useState(false);
    // const fn = useHook();
    //
    // if (!invoked) {
    //     fn();
    //     setInvoked(true);
    // }

    const effect = useHook();
    useFunction(effect, dependencies);
    // const [invoked, setInvoked] = useState(false);
    // const destructor = useCallback(!invoked ? effect() : (() => {}) as any, [!invoked ? invoked : true]);
    //
    // if (!invoked) {
    //     log('setting \'invoked\' to true');
    //     setInvoked(true);
    // }
    // else {
    //     log('\'invoked\' is true');
    // }
    //
    // useDestructor(() => {
    //     if (invoked) {
    //         log('setting \'invoked\' to false');
    //         setInvoked(false);
    //     }
    //     else {
    //         log('\'invoked\' is false');
    //     }
    //
    //     if (destructor) {
    //         log('destructing...');
    //         destructor();
    //     }
    //     else {
    //         log('destructor is falsy');
    //     }
    // }, dependencies ?? []);
}