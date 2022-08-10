export function setupMock(moduleName: string, functionName: string, ...args: any): void {
    // TODO:
    // if (!Array.isArray(args)) {
    //     require(moduleName)[`__setup__${functionName}`](args);
    // }
    // else {
    //     require(moduleName)[`__setup__${functionName}`](...args);
    // }

    // require(moduleName)[`__setup-${functionName}`](...args);

    const module = require(moduleName);

    if (!module) {
        console.log(`${moduleName} not found`);
        return;
    }

    const setup = module[`__setup-${functionName}`];

    if (!setup) {
        console.log(`${moduleName}`, module);
        return;
    }

    setup(...args);
}