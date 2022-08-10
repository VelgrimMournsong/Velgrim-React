import { useMemo } from 'react';
import { createUniqueId } from '../util';

export function useUniqueId(prefix?: string): string;
export function useUniqueId(configure: (config: UniqueIdConfig) => string | void): string;

export function useUniqueId(p1?: string | ((config: UniqueIdConfig) => string | void)): string {
    return useMemo(() => {
        if (!p1) {
            return createUniqueId();
        }
        else if (typeof p1 === 'string') {
            return `${p1}-${createUniqueId()}`;
        }
        else {
            // // TODO: "'undefined'" vs "void 0"
            // // https://stackoverflow.com/questions/29453127/javascript-difference-between-typeof-undefined-and-void
            // if (getReturnType(p1) !== void 0) {
            //     const prefixFn = p1 as () => string;
            //     return `${prefixFn()}-${createUniqueId()}`;
            // }

            let id: string | undefined;
            const configure = p1 as (config: UniqueIdConfig) => string | void;
            const append = (suffix: string) => id = `${createUniqueId()}-${suffix}`;
            const overwrite = (_id: string) => id = _id;
            const prepend = (prefix: string) => id = `${prefix}-${createUniqueId()}`;
            // TODO: when return type of configure is void, it may fail to coalesce
            return configure({ append, overwrite, prepend }) ?? id ?? createUniqueId();
        }
    }, []);
}

export interface UniqueIdConfig {
    append: (suffix: string) => void;
    overwrite: (id: string) => void;
    prepend: (prefix: string) => void;
}