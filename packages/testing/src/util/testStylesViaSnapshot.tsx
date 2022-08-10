import { act } from 'react-dom/test-utils';
import { Global, SerializedStyles } from '@emotion/react';
import { render } from '@testing-library/react';

export function testStylesViaSnapshot(styles: string | SerializedStyles): void {
    let container: HTMLDivElement;
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        const wrapper = render(<Global styles={styles} />);
        expect(wrapper.baseElement).toMatchSnapshot();
        wrapper.unmount();
    });
}

// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import Component from './Container';
//
// describe('<Component /> spec', () => {
//     it('renders the component', () => {
//         const container = render(<Component />);
//         expect(container.firstChild).toMatchSnapshot();
//     });
//
//     it('assert there are 6 regions', () => {
//         expect(document.querySelectorAll('.map-region').length).toBe(6);
//     });
//
//     it('assert there are 12 region items', () => {
//         expect(document.querySelectorAll('.region-item').length).toBe(12);
//     });
//
//     it('assert connect button renders the correct label', () => {
//         expect(document.querySelector('.connect-btn').innerHTML).toBe("Connect");
//     });
//
//     it('assert the first item link to be /somelink', () => {
//         const allAgent = document.querySelector('.region-item:first-child a');
//         expect(allAgent.getAttribute('href')).toBe('/somelink?id=123&name=link');
//     });
// });
