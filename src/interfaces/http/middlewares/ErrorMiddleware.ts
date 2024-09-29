import { Request, Response, NextFunction } from 'express';
import IError from 'src/types/shared/error';
import Logger from 'src/utils/Logger';

export class ErrorMiddleware {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  public static handle(err: IError, req: Request, res: Response, next: NextFunction): Response {
    const statusCode = err.statusCode || 500;
    const errorResponse: IError = {
      message: err.message || 'Internal Server Error',
      details: err.details || [],
      error_code: err.error_code || statusCode,
      error: err.error || undefined,
      statusCode,
    };

    const logger = new Logger();
    logger.error(`Error: ${errorResponse.message}, Status Code: ${statusCode}`);

    return res.status(statusCode).json(errorResponse);
  }
}
