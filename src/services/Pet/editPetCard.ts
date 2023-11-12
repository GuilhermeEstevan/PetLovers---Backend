import BadRequestError from "../../errors/badRequest";
import { TPetCardRequest } from "../../interfaces/pets";
import PetModel from "../../models/pets";

const editPetCardService = async (
  data: TPetCardRequest,
  petId: string,
  petCardId: string,
  userId: string
): Promise<string> => {
  if (
    data.serviceType === "" ||
    data.service === "" ||
    data.description === "" ||
    !data.date
  ) {
    throw new BadRequestError("Please provide vaccine, Description and Date");
  }

  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("No pet found");
  }

  const petCard = pet.petCards.find(
    (card) => card._id.toString() === petCardId
  );

  if (!petCard) {
    throw new BadRequestError("PetCard not found");
  }

  petCard.serviceType = data.serviceType;
  petCard.service = data.service;
  petCard.description = data.description;
  petCard.date = data.date;

  await pet.save();

  return "Pet Card updated successfully";
};

export default editPetCardService;
