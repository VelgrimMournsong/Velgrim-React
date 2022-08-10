export function withErrorSuppression(fn: () => void): void {
    try {
        fn();
    }
    catch (ex) {
        console.log({ ex });
    }
}