// noinspection DuplicatedCode

import { InvalidEnvironmentVariableError, UndefinedEnvironmentVariableError } from '../exceptions';
import { cast } from './objects';
import { isUppercase } from './casing';
import { last } from './collections';

const isReactEnvironment = !!process.env['REACT_APP_ENVIRONMENT'];

const isDevelopment = isReactEnvironment
    ? process.env['REACT_APP_ENVIRONMENT'] === 'development'
    : process.env['ENVIRONMENT'] === 'development';

const get = <T>(name: string) => {
    let formattedName: string | undefined;
    let value: string | undefined;

    try {
        formattedName = formatEnvironmentVariableName(name);
        value = process.env[formattedName!];
    }
    catch (ex: any) {
        console.log({ ex });
    }

    if (!value) {
        return undefined;
    }

    return cast<T>(value);
};

const getRequired = <T>(name: string) => {
    let formattedName: string | undefined;
    let value: string | undefined;

    try {
        formattedName = formatEnvironmentVariableName(name);
        value = process.env[formattedName!];
    }
    catch (ex: any) {
        console.log({ ex });
    }

    if (!value) {
        throw new UndefinedEnvironmentVariableError(formattedName ?? `(Alias) ${name}`);
    }

    return cast<T>(value);
};

const getNumber = (name: string) => {
    const formattedName = formatEnvironmentVariableName(name);
    const value = process.env[formattedName];

    if (!value) {
        return undefined;
    }

    const parsedValue = parseInt(value);

    if (isNaN(parsedValue)) {
        throw new InvalidEnvironmentVariableError(formattedName, 'Expected a numeric value.');
    }

    return parsedValue;
};

const getRequiredNumber = (name: string) => {
    let formattedName: string | undefined;
    let value: string | undefined;

    try {
        formattedName = formatEnvironmentVariableName(name);
        value = process.env[formattedName!];
    }
    catch (ex: any) {
        console.log({ ex });
    }

    if (!value) {
        throw new UndefinedEnvironmentVariableError(formattedName ?? `(Alias) ${name}`);
    }

    let parsedValue: number | undefined;

    try {
        parsedValue = parseInt(value);

        if (isNaN(parsedValue)) {
            throw new InvalidEnvironmentVariableError(formattedName!, 'Expected a numeric value.');
        }
    }
    catch (ex: any) {
        throw new Error(`Failed to parse number.\nInner Exception:\n${JSON.stringify(ex)}`);
    }

    return parsedValue;
};

const getString = (name: string) => {
    const formattedName = formatEnvironmentVariableName(name);
    const value = process.env[formattedName];

    if (value) {
        return value;
    }

    return undefined;
}

const getRequiredString = (name: string) => {
    let formattedName: string | undefined;
    let value: string | undefined;

    try {
        formattedName = formatEnvironmentVariableName(name);
        value = process.env[formattedName!];
    }
    catch (ex: any) {
        console.log({ ex });
    }

    if (!value) {
        throw new UndefinedEnvironmentVariableError(formattedName ?? `(Alias) ${name}`);
    }

    return value;
};

const set = (name: string, value: number | string | any) => {
    let formattedName: string | undefined;

    try {
        formattedName = formatEnvironmentVariableName(name);
        process.env[formattedName!] = typeof value === 'string' ? value : value.toString();
    }
    catch (ex: any) {
        throw new Error(
            `Failed to set environment variable: '${formattedName ?? `(Alias) ${name}`}'.\n
            Inner Exception:\n${JSON.stringify(ex)}`
        );
    }
};

function formatEnvironmentVariableName(name: string): any {
    if (!isReactEnvironment) {
        return convertToSnakeCaseWithAllCaps(name);
    }
    else {
        return convertToSnakeCaseWithAllCaps(`REACT_APP_${name}`);
    }
}

function convertToSnakeCaseWithAllCaps(str: string): string {
    const output: string[] = [];

    for (const c of str) {
        let lastCharacter = last(output);

        if (lastCharacter && !isUppercase(lastCharacter) && isUppercase(c)) {
            output.push('_');
        }

        output.push(c);
    }

    return output.join('').replace(' ', '_').toUpperCase();
}

export const Environment = {
    isDevelopment,
    get,
    getNumber,
    getRequiredNumber,
    getRequiredString,
    getString,
    set
};