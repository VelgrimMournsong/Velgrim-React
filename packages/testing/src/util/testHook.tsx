import { renderHook } from '@testing-library/react';

export function testHook(
    useHook: () => void
): void {
    const result = renderHook(() => useHook());
    result.unmount();
}
