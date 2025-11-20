import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(`${process.env.MONGODB_URL}tinylink`);
    isConnected = conn.connections[0].readyState === 1;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
  }
};
