import { useLogger } from '@velgrim/core/logging';
import { useEffect, useMemo, useState } from 'react';
import { render } from '@testing-library/react';
import { log } from '@velgrim/core/logging/util/log';

it('sanity check', () => {
    const Component = () => {
        const log = useLogger('Test');
        log.trace('test');
        const index = useMemo(() => 1, []);
        return <span>{index}</span>;
    };

    render(<Component />).unmount();
});

it('useEffect()', async () => {
    const Component = () => {
        const [index, setIndex] = useState(0);

        log({ index });
        log('rendering <Component />...');

        useEffect(() => {
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

    render(<Component />);
    log.flush();
});