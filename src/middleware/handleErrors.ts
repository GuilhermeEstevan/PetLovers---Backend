import { NextFunction, Request, Response } from "express";

const handleErrorsMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let customError: { statusCode: number; msg: string } = {
    // set default
    statusCode: error.statusCode || 500,
    msg: error.message || "Something went wrong, try again later",
  };

  if (error.code && error.code === 11000) {
    customError.msg = `Duplicated value for ${Object.keys(error.keyValue)}`;
    customError.statusCode = 400;
  }

  if (error.name === "CastError") {
    customError.msg = `No Pet found with id ${error.value}`;
    customError.statusCode = 404;
  }

  if (error.name === "ValidationError") {
    customError.msg = Object.values(error.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json(customError.msg);
};

export default handleErrorsMiddleware;
  