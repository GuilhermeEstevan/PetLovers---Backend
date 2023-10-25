import BadRequestError from "../../errors/badRequest";
import Unauthenticated from "../../errors/unauthenticated";
import { TLoginUserRequest, TLoginUserResponse } from "../../interfaces/users";
import UserModel from "../../models/users";

const loginUserService = async (
  data: TLoginUserRequest
): Promise<TLoginUserResponse> => {
  const { email, password } = data;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Unauthenticated("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated("Invalid Credentials");
  }

  const response = {
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    phone: user.phone,
    token: user.createJWT(),
  };

  return response;
};

export default loginUserService;
