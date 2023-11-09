import { Types } from "mongoose";
import BadRequestError from "../../errors/badRequest";
import { TPetGallery } from "../../interfaces/models";
import PetModel from "../../models/pets";
import { TAddGalleryPhotoRequest } from "../../interfaces/pets";

const uploadImageToGalleryService = async (
  petId: string,
  userId: string,
  data: TAddGalleryPhotoRequest
): Promise<string> => {
  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("No pet found");
  }

  const { image } = data;

  const newImage: TPetGallery = {
    _id: new Types.ObjectId(),
    image: image,
    updatedAt: new Date(),
  };

  pet.gallery.push(newImage);
  await pet.save();

  console.log(pet.gallery);

  return "Upload de imagem com sucesso!";
};

export default uploadImageToGalleryService;
