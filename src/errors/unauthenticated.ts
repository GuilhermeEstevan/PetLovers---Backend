import { StatusCodes } from "http-status-codes";
import AppError from "./appError";

export default class Unauthenticated extends AppError {
  constructor(
    public message: string,
    public statusCode: number = StatusCodes.UNAUTHORIZED
  ) {
    super(message);
  }
}
