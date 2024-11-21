import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método PUT
async function handlePut(req, res) {
    try {
        const { id } = req.query; // Expecting the ID in the query
        const updatedData = req.body; // Data sent in the request body

        console.log('Data in request body:', req.body);

        // Fetch the users from the database
        const users = await Ganador.find({}); // Replace with the appropriate query to fetch users

        // Check if the users array is retrieved
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found to update' });
        }

        // Iterate over the array and update the "actual" field of each user
        const updatedUsers = users.map(user => {
            if (updatedData._id === user._id.toString()) {
                return { ...user._doc, actual: updatedData.actual }; // Update the "actual" field
            }
            return user; // Keep the user as is if no update
        });

        console.log('Updated users:', updatedUsers);

        // Save the updated users in the database
        await Promise.all(
            updatedUsers.map(user =>
                Ganador.findByIdAndUpdate(user._id, { actual: user.actual }, { new: true })
            )
        );

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
