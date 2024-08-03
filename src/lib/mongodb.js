import mongoose from "mongoose";

const url = process.env.MONGOURL

export async function connectDB(){
    try {
        await mongoose.connect(url);
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
  }
