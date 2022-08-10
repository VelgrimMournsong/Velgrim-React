import { LoggingColors } from '../abstractions/loggingColors';
import { LogLevel } from '../types/logLevel';
import { _getLoggingColor } from './_getLoggingColor';

const colors: LoggingColors = {
    critical: _getLoggingColor('Critical'),
    debug: _getLoggingColor('Debug'),
    error: _getLoggingColor('Error'),
    information: _getLoggingColor('Information'),
    trace: _getLoggingColor('Trace'),
    warning: _getLoggingColor('Warning')
};

export function _getLogLevelColorHexCode(logLevel: LogLevel): string {
    switch (logLevel) {
        case 'Critical':
            return colors.critical;

        case 'Debug':
            return colors.debug;

        case 'Error':
            return colors.error;

        case 'Information':
            return colors.information;

        case 'Trace':
            return colors.trace;

        case 'Warning':
            return colors.warning;

        default:
            throw new Error(`Invalid LogLevel: ${logLevel}`);
    }
}