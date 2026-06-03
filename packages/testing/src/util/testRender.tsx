// TODO: retire this in favor of testJsx()?
import { render } from '@testing-library/react';
import {
    CElement,
    Component,
    ComponentState,
    DOMAttributes,
    DOMElement,
    FunctionComponentElement,
    ReactElement
} from 'react';

type JsxInput =
    | DOMElement<DOMAttributes<any>, any>
    | Array<DOMElement<DOMAttributes<any>, any>>
    | FunctionComponentElement<any>
    | Array<FunctionComponentElement<any>>
    | CElement<any, any>
    | Array<CElement<any, Component<any, ComponentState>>>
    | ReactElement
    | ReactElement[];

export function testRender<T extends Element>(element: DOMElement<DOMAttributes<T>, T>, callback?: () => void): void;

export function testRender(element: Array<DOMElement<DOMAttributes<any>, any>>, callback?: () => void): void;

export function testRender(
    element: FunctionComponentElement<any> | Array<FunctionComponentElement<any>>,
    callback?: () => void
): void;

export function testRender<P, T extends Component<P, ComponentState>>(
    element: CElement<P, T>,
    callback?: () => void
): void;

export function testRender(element: Array<CElement<any, Component<any, ComponentState>>>, callback?: () => void): void;

export function testRender<P>(element: ReactElement<P>, callback?: () => void): void;

export function testRender(element: ReactElement[], callback?: () => void): void;

export function testRender(jsx: JsxInput, callback?: () => void): void {
    const wrapper = render(jsx as any);

    try {
        callback?.();
    }
    finally {
        wrapper.unmount();
    }
}
