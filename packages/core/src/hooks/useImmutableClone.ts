import { useMemo } from 'react';
import { createImmutableClone } from '../util';

// TODO: move to @entropic-zenith/core/hooks
export function useImmutableClone<T>(obj: T): T {
    return useMemo(() => createImmutableClone(obj), [obj]);
}