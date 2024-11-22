import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Ruta al archivo en el servidor
        const imagePath = path.join(process.cwd(), 'public', 'uploads', 'nuevoBanner.webp');

        // Comprobamos si el archivo existe
        fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
                // Si el archivo no existe, devolvemos la URL predeterminada
                return res.status(200).json({ backgroundUrl: '/assets/banner/background.webp' });
            }

            // Si el archivo existe, devolvemos su URL
            return res.status(200).json({ backgroundUrl: '/uploads/nuevoBanner.webp' });
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Método no permitido.');
    }
}
