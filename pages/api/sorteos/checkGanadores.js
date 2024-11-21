import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

async function handlePut(req, res) {
    try {
        const updatedData = req.body; // Array de usuarios con datos actualizados

        if (!Array.isArray(updatedData) || updatedData.length === 0) {
            return res.status(400).json({ error: 'No data provided or invalid format' });
        }

        console.log('Data in request body:', updatedData);

        // Obtener los usuarios de la base de datos
        const users = await Ganador.find({});
        console.log('Users in DB:', users);

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found in the database' });
        }

        // Crear una lista de promesas para actualizar los usuarios
        const updatePromises = updatedData.map(data => {
            const userToUpdate = users.find(user => user._id.toString() === data._id);

            if (userToUpdate) {
                return Ganador.findByIdAndUpdate(
                    data._id, // ID del usuario
                    { actual: data.actual }, // Campo a actualizar
                    { new: true } // Retornar el documento actualizado
                );
            }
            return null;
        });

        // Ejecutar las actualizaciones y filtrar resultados nulos
        const updatedUsers = (await Promise.all(updatePromises)).filter(Boolean);

        console.log('Updated users:', updatedUsers);

        return res.status(200).json({
            message: 'Users updated successfully',
            data: updatedUsers,
        });
    } catch (error) {
        console.error('Error updating users:', error);
        return res.status(500).json({ error: 'Error updating users' });
    }
}





// Controlador para el método DELETE
async function handleDelete(req, res) {
    try {
        const { dni } = req.query;
        const deletedSorteo = await Ganador.findByIdAndDelete(dni);
        if (!deletedSorteo) {
            return res.status(404).json({ error: 'ganador no encontrado' });
        }
        return res.status(200).json({ message: 'ganador eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar al ganador:', error);
        return res.status(500).json({ error: 'Error al eliminar al ganador' });
    }
}

export default async function handler(req, res) {
    await connectDB();

    switch (req.method) {
        case 'PUT':
            return handlePut(req, res);
        case 'DELETE':
            return handleDelete(req, res);
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
}
