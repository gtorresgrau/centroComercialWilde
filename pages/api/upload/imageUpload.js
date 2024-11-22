import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.uploadDir = './public/uploads'; // Carpeta para guardar las imágenes
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Error al procesar la imagen.' });
            }

            const file = files.file;
            const newPath = path.join(process.cwd(), 'public/uploads', file.newFilename);

            fs.renameSync(file.filepath, newPath);

            return res.status(200).json({ url: `/uploads/${file.newFilename}` });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Método no permitido.');
    }
}
