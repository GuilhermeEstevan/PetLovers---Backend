import app from "./app";
import connectDB from "./DB/connect";

const port: number = Number(process.env.PORT) || 3000;

const start = async () => {
  const URI = process.env.MONGO_URI;
  if (!URI) {
    return console.log(`Invalid Mongo URI : ${URI}`);
  }
  try {
    await connectDB(URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
