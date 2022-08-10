type FunctionName = string;
type MockFunction = (...args: any) => any;
type SetupFunction = (...args: any) => MockFunction;
export type MockModuleFn = [FunctionName, SetupFunction];