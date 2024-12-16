import { Formidable } from 'formidable';
import cloudinary from 'cloudinary';

export const config = {
    api: {
        bodyParser: false, // Necesario para usar Formidable
    },
};

// Configuración de Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
cloudinary.v2.api.resources({ max_results: 1 }, (error, result) => {
    if (error) console.error("Error conectando con Cloudinary:", error);
    else console.log("Conexión exitosa con Cloudinary:", result);
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log('Headers recibidos:', req.headers);
        console.log('Body recibido:', req.body);

        const form = new Formidable({
            multiples: false,
            allowEmptyFiles: false,
        });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error al analizar el formulario:', err);
                return res.status(500).json({ error: 'Error al procesar la imagen.' });
            }
        
            console.log('Archivos procesados por Formidable:', files); // Depuración
            const file = files.file && files.file[0]?.filepath; // Acceder al primer archivo
        
            if (!file) {
                console.error('No se subió ningún archivo.');
                return res.status(400).json({ error: 'No se subió ningún archivo.' });
            }
        
            try {
                const result = await cloudinary.v2.uploader.upload(file, {
                    folder: 'banners',
                    public_id: 'nuevoBanner',
                    overwrite: true,
                });
                res.status(200).json({ url: result.secure_url });
            } catch (uploadError) {
                console.error('Error subiendo a Cloudinary:', uploadError);
                res.status(500).json({ error: 'Error subiendo la imagen a Cloudinary.' });
            }
        });        
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Método no permitido.');
    }
}

