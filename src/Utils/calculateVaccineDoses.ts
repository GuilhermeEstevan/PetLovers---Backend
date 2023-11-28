import BadRequestError from "../errors/badRequest";
import { Vaccines } from "./VaccinesAndExams";
import { addDays } from "date-fns";

type TCalculateVaccineDosesResponse = {
  remainingDoses: number;
  nextDueDate: string | undefined;
};

const calculateVaccineDoses = (
  vaccineName: string,
  vaccineDate: Date,
  doseNumber: string
): TCalculateVaccineDosesResponse => {
  const formattedDoseNumber: Record<string, number> = {
    primeira: 1,
    segunda: 2,
    terceira: 3,
  };
  const parsedVaccineDate = new Date(vaccineDate);

  let remainingDoses;
  let nextDueDate;

  switch (vaccineName) {
    //Vacina Polivalente
    case Vaccines.POLIVALENT:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina Antirrábica
    case Vaccines.RABIES:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina contra Giárdia
    case Vaccines.GIARDIA:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else if (remainingDoses == 2) {
        nextDueDate = addDays(parsedVaccineDate, 28).toISOString();
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina contra a Leishmaniose
    case Vaccines.LEISHMANIOSIS:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina contra a gripe canina
    case Vaccines.CANINE_FLU:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina contra a Leptospirose
    case Vaccines.LEPTOSPIROSIS:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else {
        nextDueDate = addDays(parsedVaccineDate, 180).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina Quíntupla
    case Vaccines.QUINTUPLE:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else if (remainingDoses === 2) {
        nextDueDate = addDays(parsedVaccineDate, 30).toISOString();
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina Tríplice
    case Vaccines.TRIPLE:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else if (remainingDoses === 2) {
        nextDueDate = addDays(parsedVaccineDate, 30).toISOString();
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina contra a Leucemia Felina
    case Vaccines.FELINE_LEUKEMIA:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else if (remainingDoses === 2) {
        nextDueDate = addDays(parsedVaccineDate, 30).toISOString();
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    //Vacina contra a Clamidiose
    case Vaccines.CHLAMYDIOSIS:
      console.log(doseNumber);

      remainingDoses = 3 - formattedDoseNumber[doseNumber];
      if (remainingDoses === 0) {
        nextDueDate = undefined;
      } else if (remainingDoses === 2) {
        nextDueDate = addDays(parsedVaccineDate, 30).toISOString();
      } else {
        nextDueDate = addDays(parsedVaccineDate, 365).toISOString();
      }
      return {
        remainingDoses,
        nextDueDate,
      };
    default:
      throw new BadRequestError("Vacina não existente!");
  }
};

export default calculateVaccineDoses;
