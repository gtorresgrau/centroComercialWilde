import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const updatedData = req.body;
        if (!updatedData.fotoLocal || updatedData.fotoLocal === '') {
            updatedData.fotoLocal = 'https://res.cloudinary.com/dkiiq9feu/image/upload/v1723430293/Administraci%C3%B3n_l8mnij_i6mbqp.webp'; // URL de la imagen por defecto
        }
        if (!updatedData.logoLocal || updatedData.logoLocal === '') {
            updatedData.logoLocal = 'https://res.cloudinary.com/dkiiq9feu/image/upload/v1723430293/Administraci%C3%B3n_l8mnij_i6mbqp.webp'; // URL de la imagen por defecto
        }
        console.log(updatedData,'updateData')
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