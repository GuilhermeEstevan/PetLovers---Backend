import BadRequestError from "../../errors/badRequest";
import UserModel from "../../models/users";

const resetPasswordService = async (password: string, token: string) => {
  const user = await UserModel.findOne({
    reset_token: token,
  });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  user.password = password;
  delete user.reset_token;

  await user.save();

  return "Password changed successfully!";
};
export default resetPasswordService;
