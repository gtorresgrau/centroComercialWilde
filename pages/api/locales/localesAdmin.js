import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

// Controlador para el método GET
async function handleGet(req, res) {
    try {
        const locales = await Local.find({}, { local: 1, categoria: 1,fotoLocal:1, logoLocal:1, n_local: 1 });
        return res.status(200).json({ locales });
    } catch (error) {
        console.error('Error al obtener los locales:', error);
        return res.status(500).json({ message: 'Error al obtener los locales' });
    }
}

export default async function handler(req, res) {
    await connectDB();
  
    switch (req.method) {
        case 'GET':
            return handleGet(req, res);
        default:
            return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
}
