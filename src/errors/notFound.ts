import AppError from "./appError";

export class NotFound extends AppError {
  constructor(message: string, statusCode: number = 404) {
    super(message, statusCode);
  }
}
