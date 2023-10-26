import { Types } from "mongoose";
import BadRequestError from "../../errors/badRequest";
import { TPetGallery } from "../../interfaces/models";
import PetModel from "../../models/pets";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

const uploadImageToGalleryService = async (
  imageFile: Express.Multer.File,
  petId: string,
  userId: string
): Promise<string> => {
  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("No pet found");
  }

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

  const cloudinaryResponse = await cloudinary.uploader.upload(imageFile.path, {
    use_filename: true,
    folder: "PetLovers",
  });
  await fs.unlink(imageFile.path);
  const imageUrl = cloudinaryResponse.secure_url;

  if (!imageUrl) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const newImage: TPetGallery = {
    _id: new Types.ObjectId(),
    image: imageUrl,
    updatedAt: new Date(),
  };

  pet.gallery.push(newImage);
  await pet.save();

  console.log(pet.gallery);

  return "Upload de imagem com sucesso!";
};

export default uploadImageToGalleryService;
