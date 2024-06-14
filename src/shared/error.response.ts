import { Error } from './error.enum';

export class ErrorResponse {
  readonly code?: Error;
  readonly message: string;
  readonly details?: object;

  constructor({
    code,
    message,
    details,
  }: {
    code?: Error;
    message: string;
    details?: object;
  }) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}
