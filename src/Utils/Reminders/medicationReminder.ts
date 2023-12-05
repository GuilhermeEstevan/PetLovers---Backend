import { tr } from "date-fns/locale";
import { TPet } from "../../interfaces/pets";
import PetModel from "../../models/pets";
import UserModel from "../../models/users";
import { throws } from "assert";
import BadRequestError from "../../errors/badRequest";
import { emailservice } from "../sendEmail.utils";

type TMedicationDueDateReminderData = {
  userId: string;
  petName: string;
  medicationType: string;
  frequency: string;
  nextMedicationDate: string;
  date: Date;
  description?: string;
};

type TMedicationEmailData = {
  petName: string;
  medicationType: string;
  frequency: string;
  nextMedicationDate: string;
  email: string;
  userName: string;
  description: string;
  date: Date;
};

const medicationReminder = async () => {
  const allPets: TPet[] = await PetModel.find({});

  const petsWithFilledCard = allPets.filter((pet) => {
    if (pet.petCards && pet.petCards.length > 0) {
      return true;
    }
  });

  const medicationDueDateReminderData: TMedicationDueDateReminderData[] = [];

  petsWithFilledCard.map((pet) => {
    const petCard = pet.petCards;

    const medicationForPets = petCard?.filter(
      (petCardItem) => petCardItem.serviceType === "medicamento"
    );

    medicationForPets?.map((medication) => {
      if (medication.medicationInfo?.nextMedicationDate !== undefined) {
        medicationDueDateReminderData.push({
          userId: pet.createdBy.toString(),
          petName: pet.name,
          medicationType: medication.medicationInfo?.medicationType,
          frequency: medication.medicationInfo?.frequency,
          nextMedicationDate: medication.medicationInfo?.nextMedicationDate,
          description: medication.description,
          date: medication.date,
        });
      }
    });
  });

  const medicationEmailData: TMedicationEmailData[] = [];

  await Promise.all(
    medicationDueDateReminderData.map(async (item) => {
      const isSameDate = (date: string) => {
        const formattedDate = new Date(date);
        const today = new Date();
        return (
          formattedDate.getDate() === today.getDate() &&
          formattedDate.getMonth() === today.getMonth() &&
          formattedDate.getFullYear() === today.getFullYear()
        );
      };

      if (isSameDate(item.nextMedicationDate)) {
        const user = await UserModel.findOne({ _id: item.userId });
        if (!user) {
          throw new BadRequestError("User not found!");
        }

        medicationEmailData.push({
          petName: item.petName,
          medicationType: item.medicationType,
          frequency: item.frequency,
          nextMedicationDate: item.nextMedicationDate,
          description: item.description || "",
          email: user?.email,
          userName: user.name,
          date: item.date,
        });
      }
    })
  );

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await Promise.all(
    medicationEmailData.map(async (data, index) => {
      console.log("sending email to: ", data.email);

      const addLeadingZero = (value: number) => {
        if (value < 10) return `0${value}`;
        else return value;
      };
      const nextMedicationDate = new Date(data.nextMedicationDate);
      const date = data.date

      const formattedNextMedicationDate = `${addLeadingZero(
        nextMedicationDate.getDate()
      )}/${
        nextMedicationDate.getMonth() + 1
      }/${nextMedicationDate.getFullYear()}`;

      const formattedDate = `${addLeadingZero(
        date.getDate()
      )}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;


      const birthDayTemplate = emailservice.medicationReminderTemplate(
        data.email,
        data.userName,
        data.petName,
        data.medicationType,
        data.frequency,
        formattedNextMedicationDate,
        data.description,
        formattedDate
      );

      const delay = index * 1000;
      await sleep(delay);
      await emailservice.sendEmail(birthDayTemplate);
      console.log("Email sent to:", data.email);
    })
  );

  console.log(medicationEmailData);
};

const scheduleMedicationReminder = () => {
  setTimeout(async () => {
    console.log("medication reminder");
    await medicationReminder();
  }, 5000);
};

export default scheduleMedicationReminder;
