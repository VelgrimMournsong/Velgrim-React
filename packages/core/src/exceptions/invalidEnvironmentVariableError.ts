export class InvalidEnvironmentVariableError extends Error {
    constructor(name: string, message: string) {
        super();
        this.message = `Invalid environment variable: ${name}.\n` + message;
    }

    override get name() {
        return 'InvalidEnvironmentVariableError';
    }
}
