import { StrictMode } from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { map } from 'rxjs';
import { createEvents } from '@velgrim/rxjs/util/createEvents';

interface State {
    count: number;
    label: string;
}

it('validates the Fixture Manager event/state critical path under StrictMode', async () => {
    const [useEvents, EventsProvider] = createEvents(rx => ({
        count$: rx<number>(0),
        state$: rx<State>({ count: 0, label: 'initial' })
    }));

    const snapshots: Array<{
        count: number;
        doubled: number;
        incremented: number;
        patched: State;
        reduced: number;
    }> = [];

    let dispatch!: (value: number) => void;
    let patch!: (value: Partial<State>) => void;

    const Harness = () => {
        const { count$, state$ } = useEvents();
        const doubled$ = count$.useMap(value => value * 2, []);
        const incremented$ = count$.usePipe([map(value => value + 1)], []);
        const count = count$.useState(0);
        const doubled = doubled$.useState(0);
        const incremented = incremented$.useState(1);
        const patched = state$.useState({ count: 0, label: 'initial' });
        const reduced = useEvents().useReducedState(0, action => [
            action('count$', (state, value) => state + value)
        ]);

        dispatch = value => count$.dispatch(value);
        patch = value => state$.patch(value);

        snapshots.push({ count, doubled, incremented, patched, reduced });

        return null;
    };

    render(
        <StrictMode>
            <EventsProvider>
                <Harness />
            </EventsProvider>
        </StrictMode>
    );

    act(() => {
        dispatch(2);
        patch({ label: 'patched' });
    });

    await waitFor(() => {
        expect(snapshots).toContainEqual({
            count: 2,
            doubled: 4,
            incremented: 3,
            patched: { count: 0, label: 'patched' },
            reduced: 2
        });
    });
});
