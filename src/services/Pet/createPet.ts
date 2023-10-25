import { TCreatePetRequest, TPet } from "../../interfaces/pets";
import PetModel from "../../models/pets";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

const createPetService = async (
  data: TCreatePetRequest,
  userId: string,
  imageFile: Express.Multer.File
): Promise<TPet> => {
  const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.path, {
    use_filename: true,
    folder: "PetLovers",
  });
  await fs.unlink(imageFile.path);

  const imageUrl = cloudinaryResponse.secure_url;

  if (!imageUrl) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const pet = await PetModel.create({
    ...data,
    createdBy: userId,
    photo: imageUrl,
  });

  if (!pet) {
    throw new Error("Failed to create pet");
  }

  return pet;
};

export default createPetService;
