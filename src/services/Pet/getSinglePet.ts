import BadRequestError from "../../errors/badRequest";
import { TPet } from "../../interfaces/pets";
import PetModel from "../../models/pets";

const getSinglePetService = async (
  petId: string,
  userId: string
): Promise<TPet | null> => {
  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("Nenhum pet encontrado");
  }

  return pet;
};

export default getSinglePetService;
