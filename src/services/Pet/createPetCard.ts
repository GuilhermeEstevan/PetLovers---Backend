import BadRequestError from "../../errors/badRequest";
import { TPetCardRequest } from "../../interfaces/pets";
import PetModel from "../../models/pets";
import {
  TMedicationInfo,
  TPetCard,
  TVaccineInfo,
} from "../../interfaces/models";
import { Types } from "mongoose";
import calculateVaccineDoses from "../../Utils/calculateVaccineDoses";

const createPetCardService = async (
  data: TPetCardRequest,
  petId: string,
  userId: string
): Promise<string> => {
  if (data.serviceType === "" || data.service === "" || !data.date) {
    throw new BadRequestError("Please Provide service, serviceType and date");
  }
  console.log(data);

  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("no Pet found");
  }

  // Alimentar vaccineInfo
  let vaccineInfo: TVaccineInfo | undefined;

  // const nextDueDate = new Date(data.date);
  // nextDueDate.setMonth(nextDueDate.getMonth() + 6);

  if (data.serviceType === "vacina") {
    if (!data.doseNumber) {
      throw new BadRequestError("Please provide doseNumber");
    }
    const nextDueDateResult = calculateVaccineDoses(
      data.service,
      data.date,
      data.doseNumber
    );
    console.log(nextDueDateResult);

    vaccineInfo = {
      vaccineType: data.service,
      doseNumber: data.doseNumber,
      nextDueDate: nextDueDateResult.nextDueDate,
    };
  }

  let medicationInfo: TMedicationInfo | undefined;

  if (data.serviceType === "medicamento") {
    if (!data.medicationType || !data.frequency) {
      throw new BadRequestError("Please provide medication type and frequency");
    }
    medicationInfo = {
      medicationType: data.medicationType,
      frequency: data.frequency,
      nextMedicationDate: "",
    };
  }

  const newPetCard: TPetCard = {
    _id: new Types.ObjectId(),
    serviceType: data.serviceType,
    service: data.service,
    description: data.description || "",
    date: data.date,
    vaccineInfo: vaccineInfo as TVaccineInfo,
    medicationInfo: medicationInfo as TMedicationInfo,
  };

  pet.petCards.push(newPetCard);
  await pet.save();

  return "Pet Card created suceesfully";
};
export default createPetCardService;
