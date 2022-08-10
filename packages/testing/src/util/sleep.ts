export function sleep(milliseconds: number): void {
    const timestamp = Date.now();
    let now = null;

    do {
        now = Date.now()
    } while (now - timestamp < milliseconds);
}
