import { connectDB } from '../../../server/utils/mongodb';
import Sorteo from '../../../src/models/sorteos';

// Controlador para el método GET
async function handleGet(req, res) {
    const { chw } = req.query;  // Obtiene el valor del query param `chw`

    let filtro;
    if (chw === 'true') {
        filtro = { chw: true };  // Filtro para usuarios con `chw: true`
    } else if (chw === 'false') {
        filtro = { chw: false };  // Filtro para usuarios con `chw: false`
    } else if (chw === 'all') {
        filtro = {};  // Sin filtro, obtiene todos los registros
    } else {
        return res.status(400).json({ message: 'Parámetro inválido.' });
    }
    
    try {
        const sorteos = await Sorteo.find(filtro);
        return res.status(200).json({ sorteos });
    } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        return res.status(500).json({ message: 'Error al obtener las inscripciones' });
    }
}

export default async function handler(req, res) {
    await connectDB();
    return handleGet(req, res);
}