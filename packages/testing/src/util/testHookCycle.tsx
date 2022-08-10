// TODO: delete, this doesn't offer the utility I was hoping to achieve
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { FC } from 'react';

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
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        let i = 0;

        const Wrapper = () => {
            console.log(`rendering (${i++})...`);
            return <Component />;
        };

        const renderHook = (callback?: () => void) => render(<Wrapper />, container, callback);

        fn({
            render: renderHook
        });
    });

    const unmount = () => {
        unmountComponentAtNode(container);
        container.remove();
    };

    return { unmount };
}