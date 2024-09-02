import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const url = process.env.MONGO_LOCALES_URL;

if (!url) {
  throw new Error('Please define the MONGO_LOCALES_URL environment variable inside .env.local');
}

export async function connectDB() {
  // Verifica si ya hay una conexión establecida
   if (mongoose.connection.readyState >= 1) {
     console.log('Mongoose is already connected to DB');
     return;
   }

  try {
    await mongoose.connect(url, {
 
      connectTimeoutMS: 10000, // Tiempo de espera antes de fallar la conexión
      serverSelectionTimeoutMS: 5000, // Tiempo de espera para seleccionar el servidor
    });
    console.log('Mongoose connected to DB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Escuchar eventos de conexión de mongoose
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});
