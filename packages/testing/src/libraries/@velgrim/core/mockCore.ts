import { mockModule } from '../../../mocking';

export function mockCore() {
    return mockModule(
        '@velgrim/core',
        [
            [
                'createUniqueId',
                fn => fn
                //ids => () => ids.shift()
            ]
        ]
    );
}