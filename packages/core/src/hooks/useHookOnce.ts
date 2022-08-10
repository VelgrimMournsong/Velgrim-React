import { useState } from 'react';

// TODO: test
export function useHookOnce(useHook: () => () => void): void {
    const [invoked, setInvoked] = useState(false);
    const fn = useHook();

    if (!invoked) {
        fn();
        setInvoked(true);
    }
}