import { renderHook } from '@testing-library/react';
import { createUniqueId } from '@velgrim/core/util/createUniqueId';
import { useUniqueId } from '@velgrim/core/hooks/useUniqueId';

const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

it('creates UUID v4-compatible identifiers', () => {
    expect(createUniqueId()).toMatch(uuidV4Pattern);
    expect(createUniqueId()).not.toBe(createUniqueId());
});

it('keeps useUniqueId stable across rerenders', () => {
    const { result, rerender } = renderHook(() => useUniqueId('test'));
    const id = result.current;

    rerender();

    expect(result.current).toBe(id);
    expect(result.current.startsWith('test-')).toBe(true);
});
