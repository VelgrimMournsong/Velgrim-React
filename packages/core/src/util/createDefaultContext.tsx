import { Context, createContext } from 'react';

export function createDefaultContext<T>(): Context<T> {
    // TODO: is this try-catch needed?
    try {
        return createContext(null as unknown as T);
    }
    catch (ex) {
        console.log({ex});
        throw ex;
    }
}