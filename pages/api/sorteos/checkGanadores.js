import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const { id } = req.query; // Se espera que el ID venga en la query
        const updatedData = req.body; // Datos enviados en el cuerpo de la solicitud

        // Verificar que el cuerpo no esté vacío
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
        }

        // Buscar y actualizar el ganador por su ID
        const updatedGanador = await Ganador.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Retorna el documento actualizado y aplica validaciones
        );

        if (!updatedGanador) {
            return res.status(404).json({ error: 'Ganador no encontrado' });
        }

        return res.status(200).json({
            message: 'Ganador actualizado con éxito',
            data: updatedGanador,
        });
    } catch (error) {
        console.error('Error al actualizar al ganador:', error);
        return res.status(500).json({ error: 'Error al actualizar al ganador' });
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
