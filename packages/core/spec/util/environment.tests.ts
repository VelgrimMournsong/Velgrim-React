describe('Environment', () => {
    const originalProcess = globalThis.process;

    afterEach(() => {
        Object.defineProperty(globalThis, 'process', {
            configurable: true,
            value: originalProcess,
            writable: true
        });

        jest.resetModules();
    });

    it('can load without a process global', () => {
        jest.resetModules();

        Object.defineProperty(globalThis, 'process', {
            configurable: true,
            value: undefined,
            writable: true
        });

        expect(() => {
            require('../../src/util/environment');
        }).not.toThrow();
    });
});
