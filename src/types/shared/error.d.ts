export default interface IError {
  message?: string;
  details: unknown[];
  error_code: number;
  code?: number;
  error?: {
    message: string;
    details: unknown[];
  };
  statusCode?: number;
}
