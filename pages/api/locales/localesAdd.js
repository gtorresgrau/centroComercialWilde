import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

// Controlador para el método POST
async function handlePost(req, res) {
    try {
        const { local, n_local, email, contacto, celular, linea, ubicacion, categoria, rubro, rubroSecundario, horarios, logoLocal, fotoLocal, instagram, facebook, web, texto } = req.body;
        if (!local || !n_local || !email || !contacto || !celular || !ubicacion || !categoria || !rubro || !horarios || !logoLocal || !fotoLocal) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
        }
        const newLocal = new Local(req.body);
        await newLocal.save();
        return res.status(201).json({ message: 'Local agregado con éxito' });
    } catch (error) {
        console.error('Error al agregar el local:', error);
        return res.status(500).json({ error: 'Error al agregar el local' });
    }
}

export default async function handler(req, res) {
  await connectDB();
  return handlePost(req, res);
}