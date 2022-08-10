export interface ModuleMock {
    reset(): void;
    setup(functionName: string): (...args: any) => void;
}