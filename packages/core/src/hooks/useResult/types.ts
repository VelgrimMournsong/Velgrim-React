export type LoaderDestructor = (() => void) | void;

export interface LoaderOptions<T> {
    error(ex: any): void;
    success(data: T): void;
}

export interface LoadState<T> {
    data?: T;
    ex?: any;
    status: LoadStatus;
}

export type LoadStatus =
    | 'error'
    // | 'idle'
    | 'loading'
    | 'success';