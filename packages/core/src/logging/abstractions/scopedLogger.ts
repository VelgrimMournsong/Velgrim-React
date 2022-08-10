export interface ScopedLogger {
    get critical(): (...args: any[]) => void;
    get debug(): (...args: any[]) => void;
    get error(): (...args: any[]) => void;
    get information(): (...args: any[]) => void;
    get trace(): (...args: any[]) => void;
    get warning(): (...args: any[]) => void;
}