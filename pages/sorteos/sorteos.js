import { connectDB } from '../../../server/utils/mongodb';
import Sorteo from '../../../src/models/sorteos'; // Asegúrate de crear este modelo

// Controlador para el método POST
async function handlePost(req, res) {
    try {
        const { nombre, apellido, email, torre, piso, depto, aceptar, sorteo } = req.body;
        if (!nombre || !apellido || !email || !torre || !piso || !depto || !aceptar || !sorteo) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
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

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const { id } = req.query;
        const updatedData = req.body;
        const updatedSorteo = await Sorteo.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedSorteo) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        return res.status(200).json({ message: 'Inscripción actualizada con éxito', sorteo: updatedSorteo });
    } catch (error) {
        console.error('Error al actualizar la inscripción:', error);
        return res.status(500).json({ error: 'Error al actualizar la inscripción' });
    }
}

// Controlador para el método DELETE
async function handleDelete(req, res) {
    try {
        const { id } = req.query;
        const deletedSorteo = await Sorteo.findByIdAndDelete(id);
        if (!deletedSorteo) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        return res.status(200).json({ message: 'Inscripción eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la inscripción:', error);
        return res.status(500).json({ error: 'Error al eliminar la inscripción' });
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
