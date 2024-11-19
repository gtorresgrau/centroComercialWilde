import { connectDB } from '../../../server/utils/mongodb';
import Ganador from '../../../src/models/ganadores';

// Controlador para el método GET
export default async function handler(req, res) {
    try {
        // Ensure database connection
        await connectDB();

        // Check HTTP method
        if (req.method !== 'GET') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        // Fetch data
        const data = await Ganador.find();

        // Return successful response
        return res.status(200).json({ data });
    } catch (error) {
        // Log error details for debugging
        console.error('Error in GET /sorteos:', error);

        // Return generic error message
        return res.status(500).json({ message: 'Error al obtener los ganadores' });
    }
}