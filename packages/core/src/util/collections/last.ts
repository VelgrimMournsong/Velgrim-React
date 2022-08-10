export function last<T>(items: T[], predicate?: (item: T) => boolean): T | undefined {
    if (!items.length) {
        return undefined;
    }

    if (!predicate) {
        return items[items.length - 1];
    }

    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];

        if (predicate(item)) {
            return item;
        }
    }

    return undefined;
}