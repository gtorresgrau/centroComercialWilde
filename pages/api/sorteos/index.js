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
            return res.status(400).json({ message: 'Ya existe un usuario con ese DNI o domicilio subscrito a nuestros sorteos.' });
        }
        const newSorteo = new Sorteo(req.body);
        await newSorteo.save();
        return res.status(200).json({ message: 'Inscripción al sorteo realizada con éxito. Ya estas participando de todos los SORTEOS.' });
    } catch (error) {
        console.error('Error al inscribir al sorteo:', error);
        return res.status(500).json({ error: 'Error al inscribir al sorteo' });
    }
}

export default async function handler(req, res) {
    await connectDB();
    return handlePost(req, res);
}
