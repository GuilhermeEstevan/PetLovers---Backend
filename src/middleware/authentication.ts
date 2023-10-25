import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Unauthenticated from "../errors/unauthenticated";
import AppError from "../errors/appError";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("Invalid Authentication!");
  }

  if (!process.env.JWT_SECRET) {
    throw new AppError("No JWT_SECRET", 500);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    res.locals = {
      userId: payload.userId,
      name: payload.name,
    };

    next();
  } catch (error) {
    console.log(error);
    throw new Unauthenticated("Invalid Authentication!");
  }
};

export default authenticationMiddleware;
