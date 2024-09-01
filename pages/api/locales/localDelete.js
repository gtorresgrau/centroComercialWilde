import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

// Controlador para el método DELETE
async function handleDelete(req, res) {
    try {
        const {id} = req.query
          const deletedLocal = await Local.findByIdAndDelete(id);
         if (!deletedLocal) {
             return res.status(404).json({ error: 'Local no encontrado' });
         }
         return res.status(200).json({ message: 'Local eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el local:', error);
        // return res.status(500).json({ error: 'Error al eliminar el local' });
    }
}

export default async function handler(req, res) {
  await connectDB();
  return await handleDelete(req, res);
}