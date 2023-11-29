import cron from "node-cron";
import PetModel from "../../models/pets";
import { TPet } from "../../interfaces/pets";
import UserModel from "../../models/users";
import { emailservice } from "../sendEmail.utils";

type TBirthdayEmailData = {
  email: string;
  userName: string;
  petName: string;
};

const isSameDayAndMonth = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() && date.getMonth() === today.getMonth()
  );
};

const birthDayReminder = async () => {
  const allPets: TPet[] = await PetModel.find({});

  // Pets fazendo aniversário
  const petsToCongratulate = allPets.filter((pet) => {
    const petBirthday = pet.birthday;
    return isSameDayAndMonth(petBirthday);
  });

  const birthdayEmailData: TBirthdayEmailData[] = [];

  await Promise.all(
    petsToCongratulate.map(async (pet) => {
      const ownerId = pet.createdBy;
      const user = await UserModel.findOne({ _id: ownerId });
      if (user) {
        birthdayEmailData.push({
          email: user.email,
          userName: user.name,
          petName: pet.name,
        });
      }
    })
  );

  console.log(birthdayEmailData);

  // Pausa entre emails
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  await Promise.all(
    birthdayEmailData.map(async (data, index) => {
      console.log("sending email to: ", data.email);

      const birthDayTemplate = emailservice.petBirthdayTemplate(
        data.email,
        data.userName,
        data.petName
      );

      const delay = index * 1000;
      await sleep(delay);
      await emailservice.sendEmail(birthDayTemplate);
      console.log("Email sent to:", data.email);
    })
  );
};

const scheduleBirthdayReminder = () => {
  cron.schedule("10 33 12 * * *", async () => {
    console.log("Cron job started at", new Date().toLocaleString());
    console.log("Birthday reminder");
    await birthDayReminder();
  });
};

export default scheduleBirthdayReminder;
