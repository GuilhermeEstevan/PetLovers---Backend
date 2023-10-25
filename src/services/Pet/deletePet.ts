import BadRequestError from "../../errors/badRequest";
import PetModel from "../../models/pets";

const deletePetService = async (
  petId: string,
  userId: string
): Promise<string> => {
  const pet = await PetModel.findOneAndDelete({
    createdBy: userId,
    _id: petId,
  });

  console.log(pet);

  if (!pet) {
    throw new BadRequestError("no pet found!");
  }

  return "Pet Deleted Successfully!";
};

export default deletePetService;
