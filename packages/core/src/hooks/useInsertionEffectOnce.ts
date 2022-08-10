import { EffectCallback, useInsertionEffect } from 'react';

export function useInsertionEffectOnce(effect: EffectCallback) {
    useInsertionEffect(effect, []);
}
