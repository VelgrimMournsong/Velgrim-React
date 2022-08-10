import { notNullOrUndefined } from '../guard';
import { cast } from './cast';

export function extend<T1>(t1: T1): <T2>(t2: T2) => T1 & T2 {
    return <T2>(t2: T2) => {
        notNullOrUndefined(t1);
        notNullOrUndefined(t2);

        if (typeof t2 === 'function') {
            throw new Error('Can\'t extend object with a function');
        }

        for (const [key, value] of Object.entries(t2)) {
            (t1 as any)[key] = value;
        }

        return cast<T1 & T2>(t1);
    };
}
