import { Environment } from '../../util';
import { ScopedLogger } from '../abstractions/scopedLogger';
import { LogLevel } from '../types/logLevel';
import { _getLogLevelColorHexCode } from './_getLogLevelColorHexCode';

export class Logger implements ScopedLogger {
    private readonly logLevel: LogLevel;

    constructor(private scope: string) {
        this.logLevel = Environment.get<LogLevel>(`Logging${scope}`) ?? 'None';
    }

    get critical(): (...args: any[]) => void {
        const color = _getLogLevelColorHexCode('Critical');

        switch (this.logLevel) {
            case 'None':
            case 'Trace':
            case 'Debug':
            case 'Information':
            case 'Warning':
            case 'Error':
            case 'Critical':
                return window.console.error.bind(window.console, `%c[Critical] ${this.scope}: %s`, `color: ${color}`);

            default:
                return () => {};
        }
    }

    get debug(): (...args: any[]) => void {
        const color = _getLogLevelColorHexCode('Debug');

        switch (this.logLevel) {
            case 'None':
            case 'Trace':
            case 'Debug':
                return window.console.log.bind(window.console, `%c[Debug] ${this.scope}: %s`, `color: ${color}`);

            default:
                return () => {};
        }
    }

    get error(): (...args: any[]) => void {
        const color = _getLogLevelColorHexCode('Error');

        switch (this.logLevel) {
            case 'None':
            case 'Trace':
            case 'Debug':
            case 'Information':
            case 'Warning':
            case 'Error':
                return window.console.error.bind(window.console, `%c[Error] ${this.scope}: %s`, `color: ${color}`);

            default:
                return () => {};
        }
    }

    get information(): (...args: any[]) => void {
        const color = _getLogLevelColorHexCode('Information');

        switch (this.logLevel) {
            case 'None':
            case 'Trace':
            case 'Debug':
            case 'Information':
                return window.console.log.bind(window.console, `%c[Information] ${this.scope}: %s`, `color: ${color}`);

            default:
                return () => {};
        }
    }

    get trace(): (...args: any[]) => void {
        const color = _getLogLevelColorHexCode('Trace');

        switch (this.logLevel) {
            case 'None':
            case 'Trace':
                return window.console.log.bind(window.console, `%c[Trace] ${this.scope}: %s`, `color: ${color}`);

            default:
                return () => {};
        }
    }

    get warning(): (...args: any[]) => void {
        const color = _getLogLevelColorHexCode('Warning');

        switch (this.logLevel) {
            case 'None':
            case 'Trace':
            case 'Debug':
            case 'Information':
            case 'Warning':
                return window.console.warn.bind(window.console, `%c[Warning] ${this.scope}: %s`, `color: ${color}`);

            default:
                return () => {};
        }
    }
}