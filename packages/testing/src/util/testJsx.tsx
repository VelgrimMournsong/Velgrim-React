import { act } from 'react-dom/test-utils';
import { render, RenderResult } from '@testing-library/react';
import {
    CElement,
    Component,
    ComponentState,
    DOMAttributes,
    DOMElement,
    FunctionComponentElement,
    ReactElement
} from 'react';

export type JsxInput =
    | DOMElement<DOMAttributes<any>, any>
    | Array<DOMElement<DOMAttributes<any>, any>>
    | FunctionComponentElement<any>
    | Array<FunctionComponentElement<any>>
    | CElement<any, any>
    | Array<CElement<any, Component<any, ComponentState>>>
    | ReactElement
    | ReactElement[];

export function testJsx<T extends Element>(element: DOMElement<DOMAttributes<T>, T>, assert: (result: RenderResult) => void): void;

export function testJsx(element: Array<DOMElement<DOMAttributes<any>, any>>, assert: (result: RenderResult) => void): void;

export function testJsx(
    element: FunctionComponentElement<any> | Array<FunctionComponentElement<any>>,
    assert: (result: RenderResult) => void
): void;

export function testJsx<P, T extends Component<P, ComponentState>>(
    element: CElement<P, T>,
    assert: (result: RenderResult) => void
): void;

export function testJsx(
    element: Array<CElement<any, Component<any, ComponentState>>>,
    assert: (result: RenderResult) => void
): void;

export function testJsx<P>(element: ReactElement<P>, assert: (result: RenderResult) => void): void;

export function testJsx(element: ReactElement[], assert: (result: RenderResult) => void): void;

export function testJsx(jsx: JsxInput, assert: (result: RenderResult) => void): void {
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        const wrapper = render(jsx as any);
        assert(wrapper);
        wrapper.unmount();
    });
}

/*
// async support
export function testJsx<T extends Element>(element: DOMElement<DOMAttributes<T>, T>, assert: (result: RenderResult) => Promise<void>): Promise<void>;
export function testJsx<T extends Element>(element: DOMElement<DOMAttributes<T>, T>, assert: (result: RenderResult) => void): void;

export function testJsx(element: Array<DOMElement<DOMAttributes<any>, any>>, assert: (result: RenderResult) => Promise<void>): Promise<void>;
export function testJsx(element: Array<DOMElement<DOMAttributes<any>, any>>, assert: (result: RenderResult) => void): void;

export function testJsx(
    element: FunctionComponentElement<any> | Array<FunctionComponentElement<any>>,
    assert: (result: RenderResult) => Promise<void>
): Promise<void>;

export function testJsx(
    element: FunctionComponentElement<any> | Array<FunctionComponentElement<any>>,
    assert: (result: RenderResult) => void
): void;

export function testJsx<P, T extends Component<P, ComponentState>>(
    element: CElement<P, T>,
    assert: (result: RenderResult) => Promise<void>
): Promise<void>;

export function testJsx<P, T extends Component<P, ComponentState>>(
    element: CElement<P, T>,
    assert: (result: RenderResult) => void
): void;

export function testJsx(
    element: Array<CElement<any, Component<any, ComponentState>>>,
    assert: (result: RenderResult) => Promise<void>
): Promise<void>;

export function testJsx(
    element: Array<CElement<any, Component<any, ComponentState>>>,
    assert: (result: RenderResult) => void
): void;

export function testJsx<P>(element: ReactElement<P>, assert: (result: RenderResult) => Promise<void>): Promise<void>;
export function testJsx<P>(element: ReactElement<P>, assert: (result: RenderResult) => void): void;

export function testJsx(element: ReactElement[], assert: (result: RenderResult) => Promise<void>): Promise<void>;
export function testJsx(element: ReactElement[], assert: (result: RenderResult) => void): void;

export function testJsx(jsx: JsxInput, assert: (result: RenderResult) => void | Promise<void>): void | Promise<void> {
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    return act(async () => {
        const wrapper = render(jsx as any);
        const promise = assert(wrapper);

        if (promise) {
            await promise;
        }

        wrapper.unmount();
    });
}
*/