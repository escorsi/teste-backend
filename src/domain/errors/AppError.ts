import IError from 'src/types/shared/error';

export default class AppError {
  readonly error: {
    message?: string;
    details: unknown[];
    error_code: number;
  };
  constructor(error: unknown) {
    let typedError = error as IError;
    const message = typedError.message || typedError.error?.message || 'unknown error';

    const errorResponse = {
      message: message || typedError.error?.message,

      details: typedError.details || [{ message }] || typedError.error?.details,

      error_code: typedError.error_code || typedError.code || typedError.statusCode || 400,
    };

    this.error = errorResponse;
  }
}
