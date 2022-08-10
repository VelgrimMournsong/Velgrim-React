import { useMemo } from 'react';
import { ScopedLogger } from '../abstractions/scopedLogger';
import { Logger } from '../internal/logger';

export function useLogger(scope: string): ScopedLogger {
    return useMemo(() => new Logger(scope), [scope]);
}