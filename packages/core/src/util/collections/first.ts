export function first<T>(items: T[], predicate?: (item: T) => boolean): T | undefined {
    if (!items.length) {
        return undefined;
    }

    if (!predicate) {
        return items[0];
    }

    for (const item of items) {
        if (predicate(item)) {
            return item;
        }
    }

    return undefined;
}