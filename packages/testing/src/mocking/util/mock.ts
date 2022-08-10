import { resetMocks } from './resetMocks';
import { setupMock } from './setupMock';
import { ModuleMock } from '../types/moduleMock';

export function Mock(moduleName: string): ModuleMock {
    return {
        reset: () => resetMocks(moduleName),
        setup: (functionName: string) => (...args: any) => setupMock(moduleName, functionName, ...args)
    };
}