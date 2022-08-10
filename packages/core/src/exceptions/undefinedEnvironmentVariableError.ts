export class UndefinedEnvironmentVariableError extends Error {
    constructor(name: string) {
        super();
        this.message = `Environment variable ${name} is undefined.`;
    }

    override get name() {
        return 'UndefinedEnvironmentVariableError';
    }
}
