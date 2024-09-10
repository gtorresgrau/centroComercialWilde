import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { file } = req.body;
      console.log("ID de la imagen a eliminar:", file);

      if (!file || typeof file !== 'string') {
        return res.status(400).json({ message: 'ID de archivo inválido o no proporcionado' });
      }

      // Lógica para eliminar la imagen en Cloudinary
      const result = await cloudinary.uploader.destroy(file); // Aquí debes pasar el ID público de la imagen  
      console.log("Resultado de la eliminación:", result);

      if (result.result === 'ok') {
        return res.status(200).json({ message: 'Imagen eliminada correctamente' });
      } else {
        return res.status(400).json({ message: 'No se pudo eliminar la imagen' });
      }
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      return res.status(500).json({ message: 'Error al eliminar la imagen' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
