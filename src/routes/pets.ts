import { Router } from "express";
import { createPet, deletePet, editPet, getAllPets } from "../controllers/pets";
import {
  createPetCard,
  deletePetCard,
  editPetCard,
} from "../controllers/petCard";
import uploadImageMiddleware from "../middleware/UploadImage";
import { uploadImageToGallery } from "../controllers/petGallery";

const petsRoutes: Router = Router();

// Rota para criar um Pet e buscar todos Pets
petsRoutes
  .route("/")
  .post(uploadImageMiddleware.single("photo"), createPet)
  .get(getAllPets);

// Rota para buscar um Pet específico
petsRoutes.route("/getPet/:petId").get();

// Rota para criar um PetCard
petsRoutes.route("/createPetCard/:petId").patch(createPetCard);

// Rota para editar as informações de um pet
petsRoutes
  .route("/editPet/:petId")
  .patch(uploadImageMiddleware.single("photo"), editPet);

// Rota para excluir um pet
petsRoutes.route("/deletePet/:petId").delete(deletePet);

// Rota para um PetCard específico
petsRoutes
  .route("/:petId/petCards/:petCardId")
  .delete(deletePetCard)
  .patch(editPetCard);

// Rota para a galeria do Pet
petsRoutes
  .route("/:petId/gallery")
  .patch(uploadImageMiddleware.single("image"), uploadImageToGallery);

export default petsRoutes;
