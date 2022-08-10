import {v4} from 'uuid';

export function createUniqueId(): string {
    return v4();
}
