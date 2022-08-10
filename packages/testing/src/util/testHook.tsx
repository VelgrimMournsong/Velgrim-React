import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

export function testHook(
    useHook: () => void
): void {
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        const Component = () => {
            useHook();
            return <></>;
        };

        render((
            <Component />
        ), container);
    });

    unmountComponentAtNode(container);
    container.remove();
}