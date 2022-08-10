// import { notNullOrUndefined } from './guard';
import { cast } from './cast';

export function combine<T1>(t1: T1): <T2>(t2: T2) => T1 & T2 {
    return <T2>(t2: T2) => {
        if (typeof t1 === 'function' || typeof t2 === 'function') {
            throw new Error('can\'t combine function(s), consider using extend()');
        }

        if (!t1) {
            if (!t2) {
                return cast<T1 & T2>({});
            }

            return cast<T1 & T2>({ ...t2 });
        }

        if (!t2) {
            return cast<T1 & T2>({ ...t1 });
        }

        return { ...t1, ...t2 };
    };
}

/*
import { notNullOrUndefined } from './guard';

export function combine<T1>(t1: T1): <T2>(t2: T2) => T1 & T2 & (<T3>(t3: T3) => T1 & T2 & T3) {
    return <T2>(t2: T2) => {
        notNullOrUndefined(t1);
        notNullOrUndefined(t2);

        if (typeof t1 === 'function' || typeof t2 === 'function') {
            throw new Error('can\'t merge functions');
        }

        let obj: any;

        obj = <T3>(t3: T3) => {
            if (typeof t3 === 'function') {
                throw new Error('can\'t merge functions');
            }

            notNullOrUndefined(t3);

            for (const [key, value] of Object.entries(t3)) {
                obj[key] = value;
            }
        };

        for (const [key, value] of Object.entries(t1)) {
            obj[key] = value;
        }

        for (const [key, value] of Object.entries(t2)) {
            obj[key] = value;
        }

        return obj;
    };
}
*/