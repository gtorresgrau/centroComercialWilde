import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método GET
async function handleGet(req, res) {
    const { actual } = req.query; // Obtiene el valor del query param `actual`
    
    try {
        // Filtra por ganadores donde el campo `actual` sea true
        const sorteos = await Ganador.find({ actual: true });
        return res.status(200).json({ sorteos });
    } catch (error) {
        console.error('Error al obtener los ganadores:', error);
        return res.status(500).json({ message: 'Error al obtener los ganadores' });
    }
}

export default async function handler(req, res) {
    await connectDB();
    return handleGet(req, res);
}
