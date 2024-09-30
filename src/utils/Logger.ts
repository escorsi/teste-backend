import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

export default class Logger {
  private logger: WinstonLogger;

  constructor() {
    const logFormat = format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.errors({ stack: true }), logFormat),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }
}
