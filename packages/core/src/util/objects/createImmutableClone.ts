import { cast } from './cast';

export function createImmutableClone<T>(obj: T): T {
    if (obj === undefined) {
        return cast<T>(undefined);
    }

    if (obj === null) {
        return cast<T>(null);
    }

    if (Array.isArray(obj)) {
        if (!obj.length) {
            return cast<T>(Object.freeze([]));
        }

        return cast<T>(Object.freeze(obj.map(createImmutableClone)));
    }

    if (typeof obj !== 'object') {
        return obj;
    }

    return Object.freeze({ ...obj });
}