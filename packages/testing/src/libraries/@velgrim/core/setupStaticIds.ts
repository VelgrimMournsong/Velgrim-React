import { Mock } from '../../../mocking';

export function setupStaticIds() {
    const util = Mock('@velgrim/core');
    let i = 0;
    util.setup('createUniqueId')(() => `${i++}`);

    beforeEach(() => {
        i = 0;
    });

    afterEach(() => {
        util.reset();
    });
}