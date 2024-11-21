import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método GET
async function handleGet(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    try {
        // Obtiene los ganadores donde `actual` es true
        const ganadores = await Ganador.find({ actual: true });
        return res.status(200).json(ganadores); // Devuelve los ganadores directamente
    } catch (error) {
        console.error('Error al obtener los ganadores:', error);
        return res.status(500).json({ message: 'Error al obtener los ganadores' });
    }
}

export default async function handler(req, res) {
    await connectDB(); // Conexión con la base de datos
    return handleGet(req, res); // Llama al controlador
}
