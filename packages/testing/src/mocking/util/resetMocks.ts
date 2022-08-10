export function resetMocks(moduleName: string): void {
    const module = require(moduleName);

    if (!module) {
        console.log(`${moduleName} not found`);
        return;
    }

    if (!module['__resetMocks']) {
        console.log(`${moduleName}.__resetMocks is undefined`);
        return;
    }

    module.__resetMocks();
}