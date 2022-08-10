import { MockModuleFn } from '../types/mockModuleFn';

export function mockModule(
    moduleName: string,
    moduleFunctions: MockModuleFn[]
): any {
    const module = jest.createMockFromModule(moduleName);
    let actualFunctions = new Map<string, any>();

    for (const [functionName, setupFunction] of moduleFunctions) {
        (module as any)[`__setup-${functionName}`] = (...args: any) => {
            // TODO:
            // console.log(`setting up ${functionName}...`);
            actualFunctions.set(functionName, (module as any)[functionName]);

            // TODO:
            // if (!Array.isArray(args)) {
            //     (mockModule as any)[functionName] = setupFunction(args);
            // }
            // else {
            //     (mockModule as any)[functionName] = setupFunction(...args);
            // }
            (module as any)[functionName] = setupFunction(...args);
        }
    }

    (module as any)['__resetMocks'] = () => {
        // TODO:
        // console.log('resetting mocks...');

        for (const [functionName, actualFn] of actualFunctions.entries()) {
            // TODO:
            // console.log(`restoring ${functionName}...`);
            (module as any)[functionName] = actualFn;
        }

        actualFunctions = new Map<string, any>();
    };

    for (const [functionName, actualFn] of Object.entries(require(moduleName))) {
        // TODO:
        // console.log(`adding actual implementation for ${functionName}...`);
        (module as any)[functionName] = actualFn;
    }

    return module;
}