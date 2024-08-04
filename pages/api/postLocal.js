import { connectDB } from '../../src/lib/mongodb';
import Local from '../../src/models/locales';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    try {
      const data = req.body; 
      const newLocal = new Local(data);
      await newLocal.save();
      return res.status(201).json({ message: 'Local agregado con éxito' });
    } catch (error) {
      console.error('Error al agregar el local:', error);
      return res.status(500).json({ error: 'Error al agregar el local' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
