import mongoose, { Error } from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_STRING_URI) {
      throw new Error("Please provide Mongodb Connect String");
    }
    await mongoose.connect(process.env.MONGODB_STRING_URI);

    mongoose.connection.on("connected", () => {
      console.log("Connected To database");
      process.exit();
    });
  } catch (error: any) {
    console.log("Error", error.message);
  }
};
