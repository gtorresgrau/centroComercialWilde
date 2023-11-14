import mongoose from 'mongoose';
require('dotenv').config();
//const { MONGODB_URI } = process.env;

console.log('MongoDB:',process.env.MONGODB_URI)

//mongoose.set("strictQuery", false)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
    return conn
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
};

export { connectDB };
