import app from "./app";
import connectDB from "./DB/connect";
import scheduleBirthdayReminder from "./Utils/Reminders/petBirthdayReminder";
import scheduleVaccineReminder from "./Utils/Reminders/VaccineDueDateReminder";
import https from "https";
import fs from "fs";
import path from "path";

const privateKeyPath = "/etc/letsencrypt/live/www.petlovers.app.br/privkey.pem";
const certificatePath =
  "/etc/letsencrypt/live/www.petlovers.app.br/fullchain.pem";

const options = {
  key: fs.readFileSync(path.resolve(__dirname, privateKeyPath)),
  cert: fs.readFileSync(path.resolve(__dirname, certificatePath)),
};

const port: number = Number(process.env.PORT) || 3000;

const start = async () => {
  const URI = process.env.MONGO_URI;
  if (!URI) {
    return console.log(`Invalid Mongo URI : ${URI}`);
  }
  try {
    await connectDB(URI);
    scheduleBirthdayReminder();
    scheduleVaccineReminder();

    https.createServer(options, app).listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // app.listen(port, () => {
    //   console.log(`Server is running on port ${port}`);
    // });
  } catch (error) {
    console.log(error);
  }
};

start();
