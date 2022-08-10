import { useState } from 'react';

export function useFunctionOnce(fn: () => void): void {
    const [invoked, setInvoked] = useState(false);

    if (!invoked) {
        fn();
        setInvoked(true);
    }
}