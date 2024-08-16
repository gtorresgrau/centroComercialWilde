import { connectDB } from '../../../server/utils/mongodb';
import Local from '../../../src/models/locales';

export default async function handler(req, res) {
    await connectDB();

    // Extract path parameter `n_local` and convert it to a number
    const { n_local } = req.query;
    const n_localNumber = parseInt(n_local, 10);

    try {
        // Query the database using `n_local`
        const localEncontrado = await Local.findOne({ n_local: n_localNumber });        
        if (!localEncontrado) {
            return res.status(404).json({ message: 'No se encontró un local con ese número' });
        }

        return res.status(200).json({ localEncontrado });
    } catch (error) {
        console.error('Error al obtener el local:', error);
        return res.status(500).json({ message: 'Error al obtener el local' });
    }
}
