import BadRequestError from "../../errors/badRequest";
import { TPetCardRequest } from "../../interfaces/pets";
import PetModel from "../../models/pets";
import { TPetCard } from "../../interfaces/models";
import { Types } from "mongoose";

const createPetCardService = async (
  data: TPetCardRequest,
  petId: string,
  userId: string
): Promise<string> => {
  if (
    data.serviceType === "" ||
    data.service === "" ||
    data.description === "" ||
    !data.date
  ) {
    throw new BadRequestError(
      "Please Provide service, procedure, description and date"
    );
  }

  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("no Pet found");
  }

  const newPetCard: TPetCard = {
    _id: new Types.ObjectId(),
    serviceType: data.serviceType,
    service: data.service,
    description: data.description,
    date: data.date,
  };

  pet.petCards.push(newPetCard);
  await pet.save();

  return "Pet Card created suceesfully";
};
export default createPetCardService;
