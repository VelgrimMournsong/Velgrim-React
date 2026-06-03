import { StrictMode, useEffect } from 'react';
import { act, render } from '@testing-library/react';
import { Observable, Subject } from 'rxjs';
import { useSubscription } from '@velgrim/rxjs/hooks/useSubscription';

it('subscribes before sibling passive effects dispatch', () => {
    const subject = new Subject<number>();
    const values: number[] = [];

    const Trigger = () => {
        useEffect(() => {
            subject.next(1);
        }, []);

        return null;
    };

    const Subscriber = () => {
        useSubscription(subject, value => values.push(value), []);
        return null;
    };

    render(
        <>
            <Trigger />
            <Subscriber />
        </>
    ).unmount();

    expect(values).toEqual([1]);
});

it('cleans up subscriptions during StrictMode remounts, rerenders, and unmounts', () => {
    let activeSubscriptions = 0;
    let peakSubscriptions = 0;

    const observable = new Observable<number>(() => {
        activeSubscriptions++;
        peakSubscriptions = Math.max(peakSubscriptions, activeSubscriptions);

        return () => {
            activeSubscriptions--;
        };
    });

    const Subscriber = ({ dependency }: { dependency: number }) => {
        useSubscription(observable, () => undefined, [dependency]);
        return null;
    };

    const wrapper = render(
        <StrictMode>
            <Subscriber dependency={1} />
        </StrictMode>
    );

    expect(activeSubscriptions).toBe(1);
    expect(peakSubscriptions).toBe(1);

    wrapper.rerender(
        <StrictMode>
            <Subscriber dependency={1} />
        </StrictMode>
    );

    expect(activeSubscriptions).toBe(1);
    expect(peakSubscriptions).toBe(1);

    wrapper.rerender(
        <StrictMode>
            <Subscriber dependency={2} />
        </StrictMode>
    );

    expect(activeSubscriptions).toBe(1);
    expect(peakSubscriptions).toBe(1);

    wrapper.unmount();

    expect(activeSubscriptions).toBe(0);
});

it('keeps a single active subscription when rerendering emitted values', () => {
    const subject = new Subject<number>();
    const values: number[] = [];

    const Subscriber = () => {
        useSubscription(subject, value => values.push(value), []);
        return null;
    };

    const wrapper = render(
        <StrictMode>
            <Subscriber />
        </StrictMode>
    );

    act(() => {
        subject.next(1);
        subject.next(2);
    });

    wrapper.unmount();

    act(() => {
        subject.next(3);
    });

    expect(values).toEqual([1, 2]);
});
