// TODO:
export interface ReduceFn<T, TEvent> {
    (state: T, value: TEvent): T;
}