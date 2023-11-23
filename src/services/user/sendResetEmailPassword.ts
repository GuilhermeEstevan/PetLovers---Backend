import { randomUUID } from "crypto";
import BadRequestError from "../../errors/badRequest";
import UserModel from "../../models/users";
import { emailservice } from "../../Utils/sendEmail.utils";

type TSendEmail = {
  email: string;
};

const sendResetEmailPasswordService = async (
  data: TSendEmail
): Promise<String> => {
  const { email } = data;
  console.log(data);

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new BadRequestError("User not found!");
    }

    const resetToken = randomUUID();
    user.reset_token = resetToken;
    await user.save();

    console.log("User:", user);

    const resetPasswordTemplate = emailservice.resetPasswordTemplate(
      user.email,
      user.name,
      resetToken
    );

    await emailservice.sendEmail(resetPasswordTemplate);

    return "Email sent successfully";
  } catch (error) {
    // console.error("Error in sendResetEmailPasswordService:", error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

export default sendResetEmailPasswordService;
