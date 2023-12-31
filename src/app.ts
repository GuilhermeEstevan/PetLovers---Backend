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
app.use(cors({ origin: "*" }));
app.use(express.static("./public"));
app.use(express.json());

// CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ?? "valor_padrao",
  api_key: process.env.CLOUD_API_KEY ?? "seu_valor_padrao",
  api_secret: process.env.CLOUD_API_SECRET ?? "seu_valor_padrao",
});

// CORS
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).send();
});

// app.use(
//   cors({
//     origin: "*",
//     origin: [
//       "https://petloverswebsite.netlify.app",
//       "http://localhost:5173",
//       "https://www.petlovers.app.br",
//     ],
//   })
// );
// app.options("*", cors());
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
