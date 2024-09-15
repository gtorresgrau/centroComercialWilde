import { connectDB } from '../../../server/utils/mongodb';
import Sorteo from '../../../src/models/sorteos';

// Controlador para el método POST
async function handlePost(req, res) {
    try {
        const { nombre, apellido, email, dni, celular, torre, piso, depto, aceptar, sorteo } = req.body;
        if (!nombre || !apellido || !email || !dni || !celular || !torre || !piso || !depto || !aceptar || !sorteo) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
        }
        const usrExist = await Sorteo.findOne({
            $or: [
                { dni },
                { torre, piso, depto }
            ]
        });

        if (usrExist) {
            return res.status(400).json({ message: 'Ya existe un usuario con ese DNI o domicilio.' });
        }
        const newSorteo = new Sorteo(req.body);
        await newSorteo.save();
        return res.status(200).json({ message: 'Inscripción al sorteo realizada con éxito' });
    } catch (error) {
        console.error('Error al inscribir al sorteo:', error);
        return res.status(500).json({ error: 'Error al inscribir al sorteo' });
    }
}

// Controlador para el método GET
async function handleGet(req, res) {
    try {
        const sorteos = await Sorteo.find();
        return res.status(200).json({ sorteos });
    } catch (error) {
        console.error('Error al obtener las inscripciones:', error);
        return res.status(500).json({ message: 'Error al obtener las inscripciones' });
    }
}

export default async function handler(req, res) {
    await connectDB();

    switch (req.method) {
        case 'POST':
            return handlePost(req, res);
        case 'GET':
            return handleGet(req, res);
        default:
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
}
