import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import registerUserService from "../services/user/registerUser";
import {
  TLoginUserResponse,
  TRegisterUserResponse,
  TUpdateUserResponse,
} from "../interfaces/users";
import loginUserService from "../services/user/loginUser";
import updateUserService from "../services/user/updateUser";

const register = async (
  req: Request,
  res: Response
): Promise<Response<TRegisterUserResponse>> => {
  const response = await registerUserService(req.body);

  return res.status(StatusCodes.OK).json({ user: response });
};

const login = async (
  req: Request,
  res: Response
): Promise<Response<TLoginUserResponse>> => {
  const response = await loginUserService(req.body);
  console.log(response);

  return res.status(StatusCodes.OK).json({ user: response });
};

const updateUser = async (
  req: Request,
  res: Response
): Promise<Response<TUpdateUserResponse>> => {
  const { userId } = res.locals;

  const response = await updateUserService(req.body, userId);

  return res.status(StatusCodes.OK).json({ user: response });
};

export { register, login, updateUser };
