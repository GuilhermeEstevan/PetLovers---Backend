import { Router } from "express";
import {
  login,
  register,
  resetPassword,
  sendResetEmailPassword,
  updateUser,
} from "../controllers/users";
import authenticationMiddleware from "../middleware/authentication";

const usersRoutes: Router = Router();

usersRoutes.route("/register").post(register);
usersRoutes.route("/login").post(login);
usersRoutes.route("/updateUser").patch(authenticationMiddleware, updateUser);
usersRoutes.route("/resetPassword").post(sendResetEmailPassword);
usersRoutes.route("/resetPassword/:token").patch(resetPassword);

export default usersRoutes;
