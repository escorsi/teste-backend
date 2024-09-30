import AppError from 'src/domain/errors/AppError';
import IError from 'src/types/shared/error';

describe('AppError', () => {
  it('should set default values if no error properties are provided', () => {
    const errorObj: IError = {
      details: [],
      error_code: 400,
    };
    const appError = new AppError(errorObj);

    expect(appError.error.message).toBe('unknown error');
    expect(appError.error.details).toEqual([]);
    expect(appError.error.error_code).toBe(400);
  });

  it('should use provided error message and code', () => {
    const errorObj: IError = {
      message: 'Test error',
      details: [],
      error_code: 500,
    };
    const appError = new AppError(errorObj);

    expect(appError.error.message).toBe('Test error');
    expect(appError.error.error_code).toBe(500);
  });

  it('should handle nested error object', () => {
    const nestedError: IError = {
      error: {
        message: 'Nested error',
        details: [],
      },
      details: [],
      error_code: 400,
    };
    const appError = new AppError(nestedError);

    expect(appError.error.message).toBe('Nested error');
    expect(appError.error.error_code).toBe(400);
  });
});
