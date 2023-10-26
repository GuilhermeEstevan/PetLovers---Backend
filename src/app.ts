import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import handleErrorsMiddleware from "./middleware/handleErrors";
import noRoutesMiddleware from "./middleware/noRoutes";
import petsRoutes from "./routes/pets";
import authenticationMiddleware from "./middleware/authentication";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app: Application = express();
app.use(express.static("./public"));
app.use(express.json());

// CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ?? "valor_padrao",
  api_key: process.env.CLOUD_API_KEY ?? "seu_valor_padrao",
  api_secret: process.env.CLOUD_API_SECRET ?? "seu_valor_padrao",
});

// CORS
app.use(cors());

// Documentation
app.get("/", (req, res) => {
  res.send("<h1>PetLovers API</h1>");
});

// Routes
app.use("/api/v1/auth", usersRoutes);
app.use("/api/v1/pets", authenticationMiddleware, petsRoutes);

// Errors
app.use(noRoutesMiddleware);
app.use(handleErrorsMiddleware);

export default app;
