import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const url = process.env.MONGO_LOCALES_URL;

if (!url) {
  throw new Error('Please define the MONGOURL environment variable inside .env.local');
}

export async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    console.log('Mongoose connected to DB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Listen to mongoose connection events
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});
