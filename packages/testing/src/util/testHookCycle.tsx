// TODO: delete, this doesn't offer the utility I was hoping to achieve
import { FC } from 'react';
import { render, RenderResult } from '@testing-library/react';

export interface TestHookRef {
    useHook(): void;
}

export interface TestHookCycleContext {
    render(callback?: () => void): void;

}

export interface TestHookCycleHandle {
    unmount(): void;
}

export function testHookCycle(Component: FC, fn: (ctx: TestHookCycleContext) => void): TestHookCycleHandle {
    let wrapper: RenderResult | undefined;
    let i = 0;

    const Wrapper = () => {
        console.log(`rendering (${i++})...`);
        return <Component />;
    };

    const renderHook = (callback?: () => void) => {
        if (wrapper) {
            wrapper.rerender(<Wrapper />);
        }
        else {
            wrapper = render(<Wrapper />);
        }

        callback?.();
    };

    fn({
        render: renderHook
    });

    return {
        unmount: () => wrapper?.unmount()
    };
}
