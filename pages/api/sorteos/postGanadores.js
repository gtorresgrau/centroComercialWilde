import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método POST
async function handlePost(req, res) {
    try {
        const { nombre, dni, apellido, torre, CHW, actual  } = req.body;
        if (!nombre || !apellido ||!dni ||!CHW || !torre ) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
        }

        const newSorteo = new Ganador(req.body);
        await newSorteo.save();
        return res.status(200).json({ message: 'Se registro al Ganador con exito' });
    } catch (error) {
        console.error('Error al inscribir al ganador:', error);
        return res.status(500).json({ error: 'Error al inscribir al ganador' });
    }
}

export default async function handler(req, res) {
    await connectDB();
    return handlePost(req, res);
}
