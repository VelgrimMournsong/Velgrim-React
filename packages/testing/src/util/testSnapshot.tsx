import { act } from 'react-dom/test-utils';
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

type Jsx =
    | DOMElement<DOMAttributes<any>, any>
    | Array<DOMElement<DOMAttributes<any>, any>>
    | FunctionComponentElement<any>
    | Array<FunctionComponentElement<any>>
    | CElement<any, any>
    | Array<CElement<any, Component<any, ComponentState>>>
    | ReactElement
    | ReactElement[];

export function testSnapshot<T extends Element>(element: DOMElement<DOMAttributes<T>, T>): void;

export function testSnapshot(element: Array<DOMElement<DOMAttributes<any>, any>>): void;

export function testSnapshot(element: FunctionComponentElement<any> | Array<FunctionComponentElement<any>>): void;

export function testSnapshot<P, T extends Component<P, ComponentState>>(element: CElement<P, T>): void;

export function testSnapshot(element: Array<CElement<any, Component<any, ComponentState>>>): void;

export function testSnapshot<P>(element: ReactElement<P>): void;

export function testSnapshot(element: ReactElement[]): void;

export function testSnapshot(jsx: Jsx): void {
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        const wrapper = render(jsx as any);
        expect(wrapper.baseElement).toMatchSnapshot();
        wrapper.unmount();
    });
}
