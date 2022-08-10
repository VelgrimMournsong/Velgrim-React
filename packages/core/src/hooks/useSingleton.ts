import { useMemo } from 'react';

export function useSingleton<T>(factory: () => T) {
    return useMemo<T>(factory, []);
}