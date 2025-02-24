import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const publicId = 'banners/nuevoBannerVertical'; // Public ID de la imagen en Cloudinary

        try {
            // Elimina la imagen de Cloudinary
            const result = await cloudinary.uploader.destroy(publicId);

            if (result.result === 'ok') {
                return res.status(200).json({ message: 'Imagen eliminada correctamente.' });
            } else {
                return res.status(400).json({ error: 'No se pudo eliminar la imagen.' });
            }
        } catch (error) {
            console.error('Error al eliminar la imagen de Cloudinary:', error);
            return res.status(500).json({ error: 'Hubo un error al eliminar la imagen.' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end('Método no permitido.');
    }
}
