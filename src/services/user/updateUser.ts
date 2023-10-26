import BadRequestError from "../../errors/badRequest";
import {
  TUpdateUserRequest,
  TUpdateUserResponse,
} from "../../interfaces/users";
import UserModel from "../../models/users";

const updateUserService = async (
  data: TUpdateUserRequest,
  userId: string
): Promise<TUpdateUserResponse> => {
  const { email, name, lastName, phone } = data;

  // Verifique se todas as propriedades estão presentes
  if (!email) {
    throw new BadRequestError("Please provide the email");
  }
  if (!name) {
    throw new BadRequestError("Please provide the name");
  }
  if (!lastName) {
    throw new BadRequestError("Please provide the last name");
  }
  if (!phone) {
    throw new BadRequestError("Please provide the phone number");
  }

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    throw new BadRequestError("No user found");
  }

  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.phone = phone;

  await user.save();

  const updateUser: TUpdateUserResponse = {
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    token: user.createJWT(),
  };

  return updateUser;
};

export default updateUserService;
