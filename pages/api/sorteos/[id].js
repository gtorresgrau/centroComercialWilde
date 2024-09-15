import { connectDB } from '../../../server/utils/mongodb';
import Sorteo from '../../../src/models/sorteos';

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const { id } = req.query;
        const updatedData = req.body;
        const updatedSorteo = await Sorteo.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedSorteo) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        return res.status(200).json({ message: 'Inscripción actualizada con éxito', sorteo: updatedSorteo });
    } catch (error) {
        console.error('Error al actualizar la inscripción:', error);
        return res.status(500).json({ error: 'Error al actualizar la inscripción' });
    }
}

// Controlador para el método DELETE
async function handleDelete(req, res) {
    try {
        const { id } = req.query;
        const deletedSorteo = await Sorteo.findByIdAndDelete(id);
        if (!deletedSorteo) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        return res.status(200).json({ message: 'Inscripción eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la inscripción:', error);
        return res.status(500).json({ error: 'Error al eliminar la inscripción' });
    }
}

export default async function handler(req, res) {
    await connectDB();

    switch (req.method) {
        case 'PUT':
            return handlePut(req, res);
        case 'DELETE':
            return handleDelete(req, res);
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
}
