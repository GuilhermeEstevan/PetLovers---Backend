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
import sendResetEmailPasswordService from "../services/user/sendResetEmailPassword";
import resetPasswordService from "../services/user/resetPassword";

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

const sendResetEmailPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const response = await sendResetEmailPasswordService(req.body);

  return res.json({ message: response });
};

const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { password } = req.body;
  const { token } = req.params;
 

  const response = await resetPasswordService(password, token);

  return res.json({ message: response });
};

export { register, login, updateUser, sendResetEmailPassword, resetPassword };
