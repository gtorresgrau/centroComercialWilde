import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';


// Controlador para el método GET con nombre en params usando findOne
export default async function handleGet(req, res) {
    await connectDB();

    const { local } = req.query; // Capturar el nombre desde los parámetros de la URL
    try {
        const localEncontrado = await Local.findOne({ local });
        
        if (!localEncontrado) {
            return res.status(404).json({ message: 'No se encontró un local con ese nombre' });
        }

        return res.status(200).json({ localEncontrado });
    } catch (error) {
        console.error('Error al obtener el local:', error);
        return res.status(500).json({ message: 'Error al obtener el local' });
    }
}
