import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import { UserDocument } from "../interfaces/models";
import AppError from "../errors/appError";

const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: "Sobrenome",
    minlength: 3,
    maxlength: 20,
  },
  phone: {
    type: String,
    maxlength: 11,
    default: "",
  },
  reset_token: { type: String, default: undefined },
});

UserSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtLifetime = process.env.JWT_LIFETIME;
  if (!jwtSecret) {
    throw new AppError("JWT secret is not defined!");
  }
  if (!jwtLifetime) {
    throw new AppError("JWT lifetime is not defined!");
  }

  const token = jwt.sign({ userId: this._id, name: this.name }, jwtSecret, {
    expiresIn: jwtLifetime,
  });
  return token;
};

UserSchema.methods.comparePassword = async function (possiblePassword: string) {
  const isPasswordCorrect = await bcrypt.compare(
    possiblePassword,
    this.password
  );
  return isPasswordCorrect;
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
