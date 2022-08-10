export async function withAsyncErrorSuppression(fn: () => Promise<void>): Promise<void> {
    try {
        await fn();
    }
    catch (ex) {
        console.log({ ex });
    }
}