import cron from "node-cron";
import PetModel from "../../models/pets";
import { TPet } from "../../interfaces/pets";
import UserModel from "../../models/users";
import { emailservice } from "../sendEmail.utils";

type TVaccineDueDateReminder = {
  userId: string;
  petName: string;
  vaccineName: string;
  doseNumber: string;
  dueDate: string;
};

type TVaccineEmailData = {
  petName: string;
  vaccineName: string;
  doseNumber: string;
  dueDate: string;
  email: string;
  userName: string;
  nextDose: string;
};

const vaccineDueDateReminder = async () => {
  const allPets: TPet[] = await PetModel.find({});

  // FILTRAR OS PETS COM CARTAO != EMPTY
  const petWithFilledCard = allPets.filter((pet) => {
    if (pet.petCards && pet.petCards.length > 0 && pet.petCards != null) {
      return pet;
    }
  });
  //   console.log(petWithFilledCard);

  const VaccineDueDateReminderData: TVaccineDueDateReminder[] = [];

  //Mapear os petWithFilledCard
  petWithFilledCard.map((pet) => {
    const petCard = pet.petCards;
    // Mapear os item com serviceType === "vacina"
    const vaccinesForPet = petCard?.filter((petCardItem) => {
      return petCardItem.serviceType === "vacina";
    });
    // Preencher o array com as vacinas com nextDueDate
    vaccinesForPet?.map((vaccine) => {
      if (vaccine.vaccineInfo?.nextDueDate !== undefined) {
        VaccineDueDateReminderData.push({
          userId: pet.createdBy.toString(),
          petName: pet.name,
          vaccineName:
            vaccine.vaccineInfo?.vaccineType || "Vaccine Type Not Available",
          doseNumber:
            vaccine.vaccineInfo?.doseNumber || "Vaccine Type Not Available",
          dueDate: vaccine.vaccineInfo?.nextDueDate,
        });
      }
    });
  });

  //   console.log(VaccineDueDateReminderData);

  const vaccineEmailData: TVaccineEmailData[] = [];

  // Selecionar quais vacinas vencem em 10 dias
  await Promise.all(
    VaccineDueDateReminderData.map(async (item) => {
      const today = new Date();
      const dueDate = new Date(item.dueDate);
      const timeDifference = dueDate.getTime() - today.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if (daysDifference === 10) {
        const { userId } = item;
        const user = await UserModel.findOne({ _id: userId });
        if (user) {
          const { email, name } = user;

          // Formatação de data e doses
          const addLeadingZero = (value: number) => {
            if (value < 10) return `0${value}`;
            else return value;
          };
          const formattedDueDate = `${addLeadingZero(dueDate.getDate())}/${
            dueDate.getMonth() + 1
          }/${dueDate.getFullYear()}`;
          const nextDose = (doseNumber: string) => {
            if (doseNumber === "primeira") {
              return "segunda";
            }
            if (doseNumber === "segunda") {
              return "terceira";
            } else return "valor inválido";
          };

          vaccineEmailData.push({
            email,
            userName: name,
            petName: item.petName,
            vaccineName: item.vaccineName,
            dueDate: formattedDueDate,
            nextDose: nextDose(item.doseNumber),
            doseNumber: item.doseNumber,
          });
        }
      }
    })
  );

  //Enviar email com 10 dias de antecedencia
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await Promise.all(
    vaccineEmailData.map(async (data, index) => {
      console.log("sending email to: ", data.email);

      const vaccineReminderTemplate = emailservice.vaccineReminderTemplate(
        data.email,
        data.userName,
        data.petName,
        data.vaccineName,
        data.doseNumber,
        data.dueDate,
        data.nextDose
      );

      const delay = index * 1000;
      await sleep(delay);
      await emailservice.sendEmail(vaccineReminderTemplate);
      console.log("Email sent to:", data.email);
    })
  );

  console.log(vaccineEmailData);
};

// const scheduleVaccineReminder = () => {
//   setTimeout(async () => {
//     console.log("vaccine reminder");
//     await vaccineDueDateReminder();
//   }, 5000);
// };

const scheduleVaccineReminder = () => {
  cron.schedule("10 33 12 * * *", async () => {
    console.log("Cron job started at", new Date().toLocaleString());
    console.log("Birthday reminder");
    await vaccineDueDateReminder();
  });
};

export default scheduleVaccineReminder;
