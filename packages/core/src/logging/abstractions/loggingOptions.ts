import { LogLevel } from '../types/logLevel';
import { LoggingColors } from './loggingColors';

export interface LoggingOptions {
    colors: Partial<LoggingColors>;
    defaultLogLevel: LogLevel;
    scopes: { [scope: string]: LogLevel };
}