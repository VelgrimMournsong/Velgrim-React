export function areCongruent(x: any, y: any): boolean {
    if (!x) {
        return !y;
    }

    if (!y) {
        return false;
    }

    if (typeof x !== typeof y) {
        return false;
    }

    if (Array.isArray(x) && (x as []).length !== (y as []).length) {
        return false;
    }
    else if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
    }

    return JSON.stringify(x) === JSON.stringify(y);
}
