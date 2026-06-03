import { useEffect } from 'react';
import { testHook } from '@velgrim/testing/util/testHook';
import { testJsx } from '@velgrim/testing/util/testJsx';
import { testRender } from '@velgrim/testing/util/testRender';

it('testHook unmounts the rendered hook', () => {
    let cleanedUp = false;

    testHook(() => {
        useEffect(() => {
            return () => {
                cleanedUp = true;
            };
        }, []);
    });

    expect(cleanedUp).toBe(true);
});

it('testJsx unmounts after assertions', () => {
    let cleanedUp = false;

    const Component = () => {
        useEffect(() => {
            return () => {
                cleanedUp = true;
            };
        }, []);

        return <span>ready</span>;
    };

    testJsx(<Component />, result => {
        expect(result.getByText('ready')).toBeInTheDocument();
    });

    expect(cleanedUp).toBe(true);
});

it('testRender invokes the callback and unmounts', () => {
    let called = false;
    let cleanedUp = false;

    const Component = () => {
        useEffect(() => {
            return () => {
                cleanedUp = true;
            };
        }, []);

        return null;
    };

    testRender(<Component />, () => {
        called = true;
    });

    expect(called).toBe(true);
    expect(cleanedUp).toBe(true);
});
