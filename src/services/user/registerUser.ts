import BadRequestError from "../../errors/badRequest";
import {
  TRegisterUserRequest,
  TRegisterUserResponse,
} from "../../interfaces/users";
import UserModel from "../../models/users";

const registerUserService = async (
  data: TRegisterUserRequest
): Promise<TRegisterUserResponse> => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name, email and password!");
  }

  const user = await UserModel.create(data);

  const response: TRegisterUserResponse = {
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    phone: user.phone,
    token: user.createJWT(),
  };

  return response;
};

export default registerUserService;
