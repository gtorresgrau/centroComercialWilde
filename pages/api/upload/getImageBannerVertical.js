import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const resources = await cloudinary.api.resources_by_ids(['banners/nuevoBannerVertical']);

            if (resources.resources.length > 0) {
                const imageUrl = resources.resources[0].secure_url;
                return res.status(200).json({ backgroundUrlVertical: imageUrl });
            } else {
                return res.status(200).json({ backgroundUrlVertical: '/assets/banner/backgroundVertical.webp' });
            }
        } catch (error) {
            console.error('Error al obtener la imagen de Cloudinary:', error);
            return res.status(500).json({ error: 'Error al obtener la imagen de Cloudinary.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Método no permitido.');
    }
}
