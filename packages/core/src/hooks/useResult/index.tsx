import { useState } from 'react';
import { LoaderDestructor, LoaderOptions, LoadState } from './types';
import { useEffectOnce } from '../useEffectOnce';

export function useResult<T>(load: (options: LoaderOptions<T>) => LoaderDestructor): T | undefined {
    const [state, setState] = useState<LoadState<T>>({ status: 'loading' });

    useEffectOnce(() => {
        setState({ status: 'loading' });

        return load({
            error: (ex: any) => setState({ ex, status: 'error' }),
            success: (response: T) => setState({ data: response, status: 'success' })
        });
    });

    if (state.status === 'error') {
        throw state.ex ?? new Error('unknown error');
    }

    return state.data;
}