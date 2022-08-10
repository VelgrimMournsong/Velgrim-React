import { useCallback } from 'react';

export function useStaticCallback<T extends Function>(callback: T): T {
    return useCallback(callback, []);
}