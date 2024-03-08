import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null;

export const connectToMongoDB = async () => {
  if (cachedConnection) {
    console.log("Using cached connection");
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    cachedConnection = conn.connection;
    console.log("Connected to MongoDB");
    return cachedConnection;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
