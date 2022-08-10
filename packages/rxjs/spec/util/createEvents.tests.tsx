import { log } from '@velgrim/core';
import { createEvents } from '@velgrim/rxjs/util/createEvents';
import { useEffect, useState } from 'react';
import { render } from '@testing-library/react';

it('useEvent()', () => {
    const [useEvents, EventsProvider] = createEvents(rx => ({
        add1$: rx<number>(),
        add2$: rx<number>()
    }));

    const Void = () => {
        log('rendering <Void />...');
        const { add1$, add2$ } = useEvents();
        const [count, setCount] = useState(0);

        add1$.useSubscription(value => {
            log(`$add1: ${value}`);
            setCount(_count => _count + value);
        }, []);

        add2$.useSubscription(value => {
            log(`$add2: ${value}`);
            setCount(_count => _count + (value * 2));
        }, []);

        log({ '*': '<Hook />', count });
        return null;
    };

    const Trigger1 = () => {
        const { add1$ } = useEvents();
        const [triggered, setTriggered] = useState(false);

        useEffect(() => {
            if (!triggered) {
                add1$.dispatch(1)
                setTriggered(true);
            }
        }, [triggered]);

        return null;
    };

    const Trigger2 = () => {
        const { add2$ } = useEvents();
        const [triggered, setTriggered] = useState(false);

        useEffect(() => {
            if (!triggered) {
                add2$.dispatch(1);
                setTriggered(true);
            }
        }, [triggered]);

        return null;
    };

    const Trigger3 = () => {
        const { add1$ } = useEvents();
        const [triggered, setTriggered] = useState(false);

        useEffect(() => {
            if (!triggered) {
                add1$.dispatch(2);
                setTriggered(true);
            }
        }, [triggered]);

        return null;
    };

    const Trigger4 = () => {
        const { add2$ } = useEvents();
        const [triggered, setTriggered] = useState(false);

        useEffect(() => {
            if (!triggered) {
                add2$.dispatch(2);
                setTriggered(true);
            }
        }, [triggered]);

        return null;
    };

    const Trigger5 = () => {
        const { add1$ } = useEvents();
        const [triggered, setTriggered] = useState(false);

        useEffect(() => {
            if (!triggered) {
                add1$.dispatch(3);
                setTriggered(true);
            }
        }, [triggered]);

        return null;
    };

    const Trigger6 = () => {
        const { add2$ } = useEvents();
        const [triggered, setTriggered] = useState(false);

        useEffect(() => {
            if (!triggered) {
                add2$.dispatch(3);
                setTriggered(true);
            }
        }, [triggered]);

        return null;
    };

    const Wrapper = () => {
        return (
            <EventsProvider>
                <Trigger1 />
                <Trigger2 />
                <Trigger3 />
                <Void />
                <Trigger4 />
                <Trigger5 />
                <Trigger6 />
            </EventsProvider>
        );
    };

    render(<Wrapper />).unmount();
    log.flush();
});