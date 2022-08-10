import { Environment } from '../../util';
import { LogLevel } from '../types/logLevel';
import {
    LOGGING_COLORS_CRITICAL,
    LOGGING_COLORS_DEBUG,
    LOGGING_COLORS_ERROR,
    LOGGING_COLORS_INFORMATION,
    LOGGING_COLORS_TRACE,
    LOGGING_COLORS_WARNING
} from '../constants/environmentVariables';

export function _getLoggingColor(logLevel: LogLevel): string {
    switch (logLevel) {
        case 'Critical':
            return Environment.getString(LOGGING_COLORS_CRITICAL) ?? '#F02C28';

        case 'Debug':
            return Environment.getString(LOGGING_COLORS_DEBUG) ?? '#553FF8';

        case 'Error':
            return Environment.getString(LOGGING_COLORS_ERROR) ?? '#E72E08';

        case 'Information':
            return Environment.getString(LOGGING_COLORS_INFORMATION) ?? '#5D89F9';

        case 'Trace':
            return Environment.getString(LOGGING_COLORS_TRACE) ?? '#D33FF8';

        case 'Warning':
            return Environment.getString(LOGGING_COLORS_WARNING) ?? '#E79208';

        default:
            throw new Error(`Invalid LogLevel: ${logLevel}`);
    }
}