import { addDays } from "date-fns";
import { frequencyToDays } from "./cardList";

const calculateMedicationFrequency = (
  medicationDate: Date,
  frequency: string
) => {
  const parsedMedicationDate = new Date(medicationDate);
  const daysToAdd = frequencyToDays[frequency];

  if (daysToAdd === 0) {
    const nextMedicationDate = undefined;
    return nextMedicationDate;
  }

  const nextMedicationDate = addDays(
    parsedMedicationDate,
    daysToAdd
  ).toISOString();

  return nextMedicationDate;
};

export default calculateMedicationFrequency;
