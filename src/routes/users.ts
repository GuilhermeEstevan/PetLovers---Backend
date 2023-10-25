import { Router } from "express";
import { login, register } from "../controllers/users";

const usersRoutes: Router = Router();

usersRoutes.route("/register").post(register);
usersRoutes.route("/login").post(login);

export default usersRoutes;
