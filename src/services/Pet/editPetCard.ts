import calculateVaccineDoses from "../../Utils/calculateVaccineDoses";
import BadRequestError from "../../errors/badRequest";
import { TVaccineInfo } from "../../interfaces/models";
import { TEditCardRequest } from "../../interfaces/pets";
import PetModel from "../../models/pets";

const editPetCardService = async (
  data: TEditCardRequest,
  petId: string,
  petCardId: string,
  userId: string
): Promise<string> => {
  if (data.serviceType === "" || data.service === "" || !data.date) {
    throw new BadRequestError("Please provide serviceType, service and Date");
  }

  if (data.serviceType === "vacina" && data.doseNumber === undefined) {
    throw new BadRequestError("Please provide doseNumber for vaccine service");
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

  // CASO O NOVO PET CARD SEJA DO TIPO VACINA
  if (data.serviceType === "vacina" && data.doseNumber !== undefined) {
    const nextDueDateResult = calculateVaccineDoses(
      data.service,
      data.date,
      data.doseNumber
    );
    const vaccineInfo: TVaccineInfo = {
      vaccineType: data.service,
      doseNumber: data.doseNumber,
      nextDueDate: nextDueDateResult.nextDueDate,
    };
    petCard.vaccineInfo = vaccineInfo;
  } else {
    // Caso não for vacina excluir vaccineInfo
    petCard.vaccineInfo = undefined;
  }

  petCard.serviceType = data.serviceType;
  petCard.service = data.service;
  petCard.description = data.description || "";
  petCard.date = data.date;

  await pet.save();

  return "Pet Card updated successfully";
};

export default editPetCardService;
