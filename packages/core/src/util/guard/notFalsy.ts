export function notFalsy(obj: any): void {
    if (!obj) {
        throw new Error(`Expected object to not be falsy, actual: ${obj}`);
    }
}