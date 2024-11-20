import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const { id } = req.query; // Expecting the ID in the query
        const updatedData = req.body; // Data sent in the request body

        console.log('data en back:', req.body);

        // Verifying the body is not empty
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: 'No data provided for update' });
        }

        // Remove the _id field from updatedData if it's present (to avoid the update error)
        delete updatedData._id;

        // Find and update the winner by ID
        const updatedGanador = await Ganador.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Returns the updated document and applies validation
        );

        if (!updatedGanador) {
            return res.status(404).json({ error: 'Winner not found' });
        }

        return res.status(200).json({
            message: 'Winner updated successfully',
            data: updatedGanador,
        });
    } catch (error) {
        console.error('Error updating winner:', error);
        return res.status(500).json({ error: 'Error updating winner' });
    }
}


// Controlador para el método DELETE
async function handleDelete(req, res) {
    try {
        const { dni } = req.query;
        const deletedSorteo = await Ganador.findByIdAndDelete(dni);
        if (!deletedSorteo) {
            return res.status(404).json({ error: 'ganador no encontrado' });
        }
        return res.status(200).json({ message: 'ganador eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar al ganador:', error);
        return res.status(500).json({ error: 'Error al eliminar al ganador' });
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
