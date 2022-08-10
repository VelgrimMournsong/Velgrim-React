import { PartialObserver } from 'rxjs';

export type SubscribeOptions<T> = ((value: T) => void) | PartialObserver<T> & { label?: string };