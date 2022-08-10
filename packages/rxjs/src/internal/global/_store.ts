const store = new Map<string, any>();
const get = (key: string) => store.get(key);
const has = (key: string) => store.has(key);
const set = (key: string, obj: any) => store.set(key, obj);
export const _store = { get, has, set };