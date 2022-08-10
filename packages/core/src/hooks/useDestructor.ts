import { DependencyList, useEffect } from 'react';

export function useDestructor(destructor: () => void, dependencies?: DependencyList): void {
    useEffect(() => destructor, dependencies ?? []);
}