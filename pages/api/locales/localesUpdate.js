import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const updatedData = req.body;
        console.log(updatedData)
         const updatedLocal = await Local.findByIdAndUpdate(updatedData._id, updatedData, { new: true, runValidators: true });
         if (!updatedLocal) {
             return res.status(404).json({ error: 'Local no encontrado' });
         }
        return res.status(200).json({ message: 'Local actualizado con éxito', local: updatedLocal });
    } catch (error) {
        console.error('Error al actualizar el local:', error);
        return res.status(500).json({ error: 'Error al actualizar el local' });
    }
}

export default async function handler(req, res) {
  await connectDB();

  return handlePut(req, res);
}