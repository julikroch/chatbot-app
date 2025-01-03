import { Logger_Colors } from '../enums';
import type { LoggerMessages } from '../types';

class Logger {
  static generateMessage(color: string, message: LoggerMessages, base: string) {
    // eslint-disable-next-line no-console
    console.log(`%c ${base} ${message as string}`, `color: ${color}`);
  }

  trace = (message: LoggerMessages) =>
    Logger.generateMessage(Logger_Colors.trace, message, 'trace:');

  info = (message: LoggerMessages) => Logger.generateMessage(Logger_Colors.info, message, 'info:');

  error = (message: LoggerMessages) =>
    Logger.generateMessage(Logger_Colors.error, message, 'error:');
}

export const logger = new Logger();
