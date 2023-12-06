import app from "./app";
import connectDB from "./DB/connect";
import scheduleBirthdayReminder from "./Utils/Reminders/petBirthdayReminder";
import scheduleVaccineReminder from "./Utils/Reminders/VaccineDueDateReminder";
import https from "https";
import fs from "fs";
import path from "path";
import scheduleMedicationReminder from "./Utils/Reminders/medicationReminder";

const port: number = Number(process.env.PORT) || 3001;
const isProduction: boolean = process.env.ISPRODUCTION === "production";

if (isProduction) {
  const privateKeyPath =
    "/etc/letsencrypt/live/www.petlovers.app.br/privkey.pem";
  const certificatePath =
    "/etc/letsencrypt/live/www.petlovers.app.br/fullchain.pem";

  const options = {
    key: fs.readFileSync(path.resolve(__dirname, privateKeyPath)),
    cert: fs.readFileSync(path.resolve(__dirname, certificatePath)),
  };

   // AWS Server
  const start = async () => {
    const URI = process.env.MONGO_URI;
    if (!URI) {
      return console.log(`Invalid Mongo URI : ${URI}`);
    }

    try {
      await connectDB(URI);
      scheduleBirthdayReminder();
      scheduleVaccineReminder();
      scheduleMedicationReminder()
      https.createServer(options, app).listen(port, () => {
        console.log(`Server is running on port ${port} with HTTPS`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  start();
} else {

  // Local Server
  const start = async () => {
    const URI = process.env.MONGO_URI;
    if (!URI) {
      return console.log(`Invalid Mongo URI : ${URI}`);
    }
    try {
      await connectDB(URI);
      scheduleBirthdayReminder();
      scheduleVaccineReminder();
      scheduleMedicationReminder()
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  start();
}
