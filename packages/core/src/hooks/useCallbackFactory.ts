import { DependencyList, useCallback, useMemo } from 'react';

// TODO: this is only useful if there is expensive logic that creates a function and the resulting function needs to have reference equality across renders
export function useCallbackFactory<T extends Function>(
    callbackFactory: () => T,
    dependencies?: DependencyList
): T {
    dependencies ??= [{}];
    const memoizedCallback = useMemo(callbackFactory, dependencies);
    return useCallback(memoizedCallback, dependencies);
}