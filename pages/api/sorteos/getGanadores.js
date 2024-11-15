import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método GET
async function handleGet(req, res) {
    try {
        const sorteos = await Ganador.find(filtro);
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