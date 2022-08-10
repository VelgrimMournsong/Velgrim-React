import { Mock } from '@velgrim/testing/mocking';
import { testHook } from '@velgrim/testing/util/testHook';
import { testSnapshot } from '@velgrim/testing/util/testSnapshot';
// TODO: replace with testing equivalents
const { createUniqueId } = require('@archspark/util');
const { Identity, useUniqueId } = require('@archspark/hooks');

const util = Mock('@archspark/util');

// TODO: port these tests to @zenith/testing

it('mocking', () => {
    let i = 0;
    util.setup('createUniqueId')(() => `${i++}`);
    const identity = new Identity('test');

    const Component = () => {
        const { isOriginalInstance } = identity.useUniqueness();
        console.log(`Component.isOriginalInstance: ${isOriginalInstance}`);
        return <div className={`${isOriginalInstance}`} />;
    };

    const Wrapper = () => {
        return (
            <>
                <Component />
                <Component />
            </>
        );
    };

    testSnapshot(<Wrapper />);
    util.reset();
});

it('mocking', () => {
    // util.setup('createUniqueId')(['A1', 'B2']);
    const ids = ['A1', 'B2'];
    util.setup('createUniqueId')(() => ids.shift());
    // const id1 = createUniqueId();
    // const id2 = createUniqueId();
    // console.log({ ids: [id1, id2] });
    expect(createUniqueId()).toBe('A1');
    expect(createUniqueId()).toBe('B2');
    util.reset();
});

it('mocking React', () => {
    // util.setup('createUniqueId')(['A1', 'B2']);
    const ids = ['A1', 'B2'];
    util.setup('createUniqueId')(() => ids.shift());

    testHook(() => {
        // const id1 = useUniqueId();
        // const id2 = useUniqueId();
        // console.log({ ids: [id1, id2] });
        expect(useUniqueId()).toBe('A1');
        expect(useUniqueId()).toBe('B2');
    });

    util.reset();
});

it('default', () => {
    // const id1 = createUniqueId();
    // const id2 = createUniqueId();
    // console.log({ ids: [id1, id2] });
    expect(createUniqueId()).toHaveLength(36);
    expect(createUniqueId()).toHaveLength(36);
});

it('default React', () => {
    testHook(() => {
        // const id1 = useUniqueId();
        // const id2 = useUniqueId();
        // console.log({ ids: [id1, id2] });
        expect(useUniqueId()).toHaveLength(36);
        expect(useUniqueId()).toHaveLength(36);
    });
});