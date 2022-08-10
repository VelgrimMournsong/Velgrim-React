import { EffectCallback } from 'react';
import { useEffect } from 'react';

export function useEffectOnce(effect: EffectCallback): void {
    useEffect(effect, []);
}
