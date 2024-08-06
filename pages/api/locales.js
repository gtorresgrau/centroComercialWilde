import { connectDB } from '../../server/utils/mongodb';
import Local from '../../src/models/locales';

export default async function handler(req, res) {
  await connectDB(); // Conectar a la base de datos
  
  if (req.method === 'GET') {
    try {
      const locales = await Local.find(); // Obtener todos los locales de la base de datos
      res.status(200).json({ locales }); // Enviar los locales como respuesta
    } catch (error) {
      console.error('Error al obtener los locales:', error);
      res.status(500).json({ message: 'Error al obtener los locales' });
    }
  } else {
    // Manejo de métodos no permitidos
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
