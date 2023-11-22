import BadRequestError from "../../errors/badRequest";
import { TEditPetRequest, TPet } from "../../interfaces/pets";
import PetModel from "../../models/pets";

const editPetService = async (
  data: TEditPetRequest,
  petId: string,
  userId: string
): Promise<TPet | null> => {
  const updatedData: TEditPetRequest = {
    name: data.name,
    species: data.species,
    breed: data.breed,
    gender: data.gender,
    color: data.color,
    birthday: data.birthday,
    photo: data.photo,
  };
  console.log(updatedData);
  console.log(petId);

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
