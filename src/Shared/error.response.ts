export class ErrorResponse {
  readonly message: string;
  readonly details?: string;

  constructor({ message, details }: { message: string; details?: string }) {
    this.message = message;
    this.details = details;
  }
}
