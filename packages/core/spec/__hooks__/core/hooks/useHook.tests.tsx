import { useFunction } from '@velgrim/core/hooks';
import { log } from '@velgrim/core/logging';
import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';

it('useHook()', async () => {
    const Component = () => {
        const [index, setIndex] = useState(0);

        log({ index });
        log('rendering <Component />...');

        useFunction(() => {
            log('useHook() - body');

            return () => {
                log('useHook() - destruct');
            };
        });

        useEffect(() => {
            log('mounting <Component />...');

            return () => {
                log('unmounting <Component />...');
            };
        });

        if (index === 0) {
            setIndex(1);
        }

        return <div />;
    };

    render(<Component />).unmount();
    log.flush();
});

// it('useHook() - with unmounting', async () => {
//     const Component = () => {
//         const [index, setIndex] = useState(0);
//
//         log({ index });
//         log('rendering <Component />...');
//
//         useHook(() => {
//             log('useHook() - body');
//
//             return () => {
//                 log('useHook() - destruct');
//             };
//         });
//
//         useEffect(() => {
//             log('mounting <Component />...');
//
//             return () => {
//                 log('unmounting <Component />...');
//             };
//         });
//
//         if (index === 0) {
//             setIndex(1);
//         }
//
//         return <div />;
//     };
//
//     render(<Component />).unmount();
//     log.flush();
// });