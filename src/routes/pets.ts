import { Router } from "express";
import {
  createPet,
  deletePet,
  editPet,
  getAllPets,
  getSinglePet,
} from "../controllers/pets";
import {
  createPetCard,
  deletePetCard,
  editPetCard,
} from "../controllers/petCard";
import {
  deleteImageFromGallery,
  uploadImageToGallery,
} from "../controllers/petGallery";

const petsRoutes: Router = Router();

// Rota para criar um Pet e buscar todos Pets
petsRoutes.route("/").post(createPet).get(getAllPets);

// Rota para buscar um Pet específico
petsRoutes.route("/getPet/:petId").get(getSinglePet);

// Rota para criar um PetCard
petsRoutes.route("/createPetCard/:petId").patch(createPetCard);

// Rota para editar as informações de um pet
petsRoutes.route("/editPet/:petId").patch(editPet);

// Rota para excluir um pet
petsRoutes.route("/deletePet/:petId").delete(deletePet);

// Rota para um PetCard específico
petsRoutes
  .route("/:petId/petCards/:petCardId")
  .delete(deletePetCard)
  .patch(editPetCard);

// Rota para adcionar imagem a galeria do Pet
petsRoutes.route("/:petId/gallery").patch(uploadImageToGallery);

// Rota para excluir uma imagem da galeria do Pet
petsRoutes.route("/:petId/gallery/:imageId").delete(deleteImageFromGallery);

export default petsRoutes;
