import BadRequestError from "../../errors/badRequest";
import PetModel from "../../models/pets";

const deletePetCardService = async (
  petId: string,
  petCardId: string,
  userId: string
): Promise<string> => {
  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("No pet found");
  }

  console.log(pet);

  const updatedCard = pet.petCards.filter(
    (card) => card._id.toString() !== petCardId
  );

  if (updatedCard.length === pet.petCards.length) {
    throw new BadRequestError("No matching petCard found");
  }

  pet.petCards = updatedCard;
  await pet.save();

  return "Pet Card item deleted Sucessfully";
};

export default deletePetCardService;
