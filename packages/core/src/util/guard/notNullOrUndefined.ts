export function notNullOrUndefined(obj: any): void {
    if (obj === undefined) {
        throw new Error('Expected object to not be null or undefined, actual: undefined');
    }

    if (obj === null) {
        throw new Error('Expected object to not be null or undefined, actual: null');
    }
}