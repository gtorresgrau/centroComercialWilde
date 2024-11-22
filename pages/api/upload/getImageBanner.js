export default function handler(req, res) {
    if (req.method === 'GET') {
        // Aquí devuelve la URL desde tu base de datos o una configuración.
        res.status(200).json({ backgroundUrl: '/uploads/nuevaImagen.webp' });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Método no permitido.');
    }
}
