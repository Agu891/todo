import mongoose from 'mongoose';

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URL);
  console.log(`MongoDB conectada!!${conn.connection.host}`);
};
