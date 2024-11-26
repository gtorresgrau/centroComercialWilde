import { Formidable } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Disable default body parser for formidable
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new Formidable({
            uploadDir: path.join(process.cwd(), '/public/uploads'),
            keepExtensions: true,
            multiples: false, // Asegúrate de que esté configurado para manejar un único archivo
            allowEmptyFiles: false, // Asegúrate de que no se permitan archivos vacíos
        });

        try {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.error('Error parsing the form:', err);
                    return res.status(500).json({ error: 'Error parsing the form.' });
                }

                const file = files.file ? files.file[0] : null; // Asegúrate de acceder al primer archivo si es un array
                if (!file) {
                    return res.status(400).json({ error: 'No file uploaded.' });
                }

                // Depuración: Verificar las propiedades del archivo
                console.log('Received file:', file);

                const oldPath = file.filepath;
                if (!oldPath) {
                    console.error('File path is missing or invalid');
                    return res.status(400).json({ error: 'Invalid file path.' });
                }

                const newPath = path.join(form.uploadDir, 'nuevoBanner.webp');
                
                try {
                    // Renombrar/mover el archivo al destino final
                    fs.renameSync(oldPath, newPath);
                    res.status(200).json({ url: `/uploads/nuevoBanner.webp` });
                } catch (renameError) {
                    console.error('Error renaming the file:', renameError);
                    res.status(500).json({ error: 'Error renaming the file.' });
                }
            });
        } catch (error) {
            console.error('Error processing file upload:', error);
            res.status(500).json({ error: 'Internal server error during file upload.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
