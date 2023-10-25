import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const noRoutesMiddleware = (req: Request, res: Response): Response => {
  return res.status(StatusCodes.NOT_FOUND).send("Route not found");
};

export default noRoutesMiddleware;
