import { Router } from "express";
import { login, register, updateUser } from "../controllers/users";
import authenticationMiddleware from "../middleware/authentication";

const usersRoutes: Router = Router();

usersRoutes.route("/register").post(register);
usersRoutes.route("/login").post(login);
usersRoutes.route("/updateUser").post(authenticationMiddleware, updateUser);

export default usersRoutes;
