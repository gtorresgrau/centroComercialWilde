// pages/api/newsletter/unsubscribe.js
import { connectDB } from '../../../server/utils/mongodb';
import Newsletter from '../../../src/models/newsletter';

const handleUnsubscribe = async (req, res) => {
  await connectDB(); // Conéctate a la base de datos

  if (req.method === 'DELETE') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Correo electrónico es requerido' });
    }

    try {
      // Busca y elimina el registro basado en el correo electrónico
      const result = await Newsletter.deleteOne({ email });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Email no encontrado' });
      }

      // Responde con un mensaje de éxito
      res.status(200).json({ message: 'Email eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar el email del newsletter:', error);
      res.status(500).json({ error: 'Error al eliminar el email del newsletter' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
};

export default handleUnsubscribe;
