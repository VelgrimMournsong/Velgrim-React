import { Environment } from '../../util';
import { LoggingOptions } from '../abstractions/loggingOptions';
import {
    LOGGING_COLORS_CRITICAL,
    LOGGING_COLORS_DEBUG,
    LOGGING_COLORS_ERROR,
    LOGGING_COLORS_INFORMATION,
    LOGGING_COLORS_TRACE,
    LOGGING_COLORS_WARNING
} from '../constants/environmentVariables';

export function configureLogging(options: Partial<LoggingOptions>): void {
    if (options.colors) {
        if (options.colors.critical) {
            Environment.set(LOGGING_COLORS_CRITICAL, options.colors.critical);
        }

        if (options.colors.debug) {
            Environment.set(LOGGING_COLORS_DEBUG, options.colors.debug);
        }

        if (options.colors.error) {
            Environment.set(LOGGING_COLORS_ERROR, options.colors.error);
        }

        if (options.colors.information) {
            Environment.set(LOGGING_COLORS_INFORMATION, options.colors.information);
        }

        if (options.colors.trace) {
            Environment.set(LOGGING_COLORS_TRACE, options.colors.trace);
        }

        if (options.colors.warning) {
            Environment.set(LOGGING_COLORS_WARNING, options.colors.warning);
        }
    }

    if (options.defaultLogLevel) {
        Environment.set('Logging', options.defaultLogLevel);
    }

    if (options.scopes && options.scopes.size) {
        for (const [scope, logLevel] of Object.entries(options.scopes)) {
            Environment.set(`Logging${scope}`, logLevel);
        }
    }
}