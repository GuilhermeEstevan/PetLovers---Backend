import BadRequestError from "../../errors/badRequest";
import { TCreatePetRequest, TPet } from "../../interfaces/pets";
import PetModel from "../../models/pets";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

const createPetService = async (
  data: TCreatePetRequest,
  userId: string
  // imageFile: Express.Multer.File
): Promise<TPet> => {
  
  console.log(data);
  

  const pet = await PetModel.create({
    ...data,
    createdBy: userId,
  });

  if (!pet) {
    throw new BadRequestError("Failed to create pet");
  }

  return pet;
};

export default createPetService;
