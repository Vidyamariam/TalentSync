import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new Error("DB_URL is not defined in environment vairables");
    }

    const conn = await mongoose.connect(ENV.DB_URL);

    console.log("db connected successfully");
  } catch (error) {
    console.log("error connection to db", error);
    process.exit(1); //0 -sucess 1-failure
  }
};
