import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'DELETE') {
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'nuevoBanner.webp');
        
        // Verificar si el archivo existe
        if (fs.existsSync(filePath)) {
            try {
                // Eliminar el archivo
                fs.unlinkSync(filePath);
                return res.status(200).json({ message: 'Archivo eliminado correctamente.' });
            } catch (error) {
                console.error('Error al eliminar el archivo:', error);
                return res.status(500).json({ error: 'No se pudo eliminar el archivo.' });
            }
        } else {
            return res.status(404).json({ error: 'Archivo no encontrado.' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end('Método no permitido');
    }
}
