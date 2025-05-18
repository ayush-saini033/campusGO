import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

// Optional: use global to avoid re-creating connections in development
let isConnected: boolean = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected.");
    return;
  }

  if (mongoose.connections.length > 0) {
    const connection = mongoose.connections[0];
    if (connection.readyState === 1) {
      console.log("✅ Using existing MongoDB connection.");
      isConnected = true;
      return;
    }

    await mongoose.disconnect(); // if stale connection
  }

  try {
    await mongoose.connect(MONGO_URI);

    isConnected = true;
    console.log("✅ MongoDB connected successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

