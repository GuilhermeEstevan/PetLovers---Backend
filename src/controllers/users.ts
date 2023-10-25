import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import registerUserService from "../services/user/registerUser";
import { TRegisterUserResponse } from "../interfaces/users";
import loginUserService from "../services/user/loginUser";

const register = async (
  req: Request,
  res: Response
): Promise<Response<TRegisterUserResponse>> => {
  const response = await registerUserService(req.body);

  return res.status(StatusCodes.OK).json({ user: response });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const response = await loginUserService(req.body);
  console.log(response);

  return res.status(StatusCodes.OK).json({ user: response });
};

export { register, login };
