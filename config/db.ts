import mongoose from "mongoose";

// Define func for connecting to mongoDB
export const connectDB = async () => {
  // Check if there is an existing active connection
  if (mongoose.connections[0].readyState) return;

  try {
    // Create a new connection
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};