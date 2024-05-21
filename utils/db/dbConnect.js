import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected");
    return db;
  } catch (error) {
    throw new Error(error);
  }
};
export default dbConnect;
