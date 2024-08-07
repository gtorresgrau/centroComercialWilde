import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

// Controlador para el método POST
async function handlePost(req, res) {
    try {
        const { email, contacto, celular, ubicacion, categoria, rubro, horarios, logoLocal, fotoLocal } = req.body;
        if (!email || !contacto || !celular || !ubicacion || !categoria || !rubro || !horarios || !logoLocal || !fotoLocal) {
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

// Controlador para el método GET
async function handleGet(req, res) {
    const page =  '1';
    const pageSize =  '9';
    try {
        const locales = await Local.find();
        let filteredLocales = locales; // Productos que vienen desde MongoDB
          // Paginar productos
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedLocales = filteredLocales.slice(startIndex, endIndex);
        const totalPage = Math.ceil(filteredLocales.length / pageSize);

        return res.status(200).json({
            locales: paginatedLocales,
            totalPage,
        });
    } catch (error) {
        console.error('Error al obtener los locales:', error);
        return res.status(500).json({ message: 'Error al obtener los locales' });
    }
}

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const { id } = req.query;
        const updatedData = req.body;
        const updatedLocal = await Local.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedLocal) {
            return res.status(404).json({ error: 'Local no encontrado' });
        }
        return res.status(200).json({ message: 'Local actualizado con éxito', local: updatedLocal });
    } catch (error) {
        console.error('Error al actualizar el local:', error);
        return res.status(500).json({ error: 'Error al actualizar el local' });
    }
}

// Controlador para el método DELETE
async function handleDelete(req, res) {
    try {
        const { id } = req.query;
        const deletedLocal = await Local.findByIdAndDelete(id);
        if (!deletedLocal) {
            return res.status(404).json({ error: 'Local no encontrado' });
        }
        return res.status(200).json({ message: 'Local eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el local:', error);
        return res.status(500).json({ error: 'Error al eliminar el local' });
    }
}

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
      case 'POST':
          return handlePost(req, res);
      case 'GET':
          return handleGet(req, res);
      case 'PUT':
          return handlePut(req, res);
      case 'DELETE':
          return handleDelete(req, res);
      default:
          res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
          return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}