import BadRequestError from "../../errors/badRequest";
import { TCreatePetRequest, TPet } from "../../interfaces/pets";
import PetModel from "../../models/pets";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

const createPetService = async (
  data: TCreatePetRequest,
  userId: string,
  imageFile: Express.Multer.File
): Promise<TPet> => {
  console.log(imageFile);

  // Verificar condições da imagem
  if (!imageFile.mimetype.startsWith("image")) {
    throw new BadRequestError("Please Upload an Image");
  }

  const maxSize = 2 * 1024 * 1024;

  if (imageFile.size > maxSize) {
    throw new BadRequestError(
      `Please upload an image smaller than ${maxSize}KB`
    );
  }

  // Upload para cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.path, {
    use_filename: true,
    folder: "PetLovers",
  });
  await fs.unlink(imageFile.path);

  const imageUrl = cloudinaryResponse.secure_url;

  if (!imageUrl) {
    throw new BadRequestError("Failed to upload image to Cloudinary");
  }

  const pet = await PetModel.create({
    ...data,
    createdBy: userId,
    photo: imageUrl,
  });

  if (!pet) {
    throw new BadRequestError("Failed to create pet");
  }

  return pet;
};

export default createPetService;
