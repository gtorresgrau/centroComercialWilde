import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

async function handleGet(req, res) {
    try {
        // Obtener todos los locales
        const locales = await Local.find({}, { categoria: 1, rubro: 1, ubicacion: 1, _id: 0 });

        // Extraer categorías, rubros y ubicaciones únicas
        const categorias = [...new Set(locales.map(local => local.categoria))].sort();
        const rubros = [...new Set(locales.map(local => local.rubro))].sort();
        const ubicaciones = [...new Set(locales.map(local => local.ubicacion))].sort();

        return res.status(200).json({ categorias, rubros, ubicaciones });
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
