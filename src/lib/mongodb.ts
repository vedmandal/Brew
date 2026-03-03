import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  try {
    await mongoose.connect(MONGODB_URI, {
      family: 4, 
    });
    console.log("✅ MongoDB Connected via IPv4");
  } catch (error) {
    console.error("❌ MongoDB Connection error:", error);
  }
};