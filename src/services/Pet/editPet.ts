import BadRequestError from "../../errors/badRequest";
import { TEditPetRequest, TPet } from "../../interfaces/pets";
import PetModel from "../../models/pets";
import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";

const editPetService = async (
  data: TEditPetRequest,
  petId: string,
  userId: string,
  imageFile?: Express.Multer.File
): Promise<TPet | null> => {
  // CASO OCORRA UPLOAD DE NOVA FOTO
  let imageUrl;
  if (imageFile) {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      imageFile.path,
      {
        use_filename: true,
        folder: "PetLovers",
      }
    );
    imageUrl = cloudinaryResponse.secure_url;
    await fs.unlink(imageFile.path);
  }

  const updatedData: TEditPetRequest = {
    name: data.name,
    species: data.species,
    breed: data.breed,
    gender: data.gender,
    color: data.color,
    birthday: data.birthday,
    photo: imageUrl || data.photo,
  };
  console.log(updatedData);

  const UpdatedPet = await PetModel.findOneAndUpdate(
    {
      createdBy: userId,
      _id: petId,
    },
    updatedData,
    { new: true }
  );

  if (!UpdatedPet) {
    throw new BadRequestError("No pet found");
  }

  return UpdatedPet;
};

export default editPetService;
