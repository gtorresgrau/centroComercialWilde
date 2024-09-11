import { v2 as cloudinary } from 'cloudinary';
import Local from '../../../src/models/locales';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { file, id, tipo} = req.body;
      console.log("ID de la imagen a eliminar:", id);

      if (!file || typeof file !== 'string') {
        return res.status(400).json({ message: 'ID de archivo inválido o no proporcionado' });
      }

      // Lógica para eliminar la imagen en Cloudinary
      const result = await cloudinary.uploader.destroy(file); // Aquí debes pasar el ID público de la imagen  
      console.log("Resultado de la eliminación:", result);

      if (result.result === 'ok') {
           // Actualizamos solo la propiedad específica en la base de datos
           const updateResult = await Local.findByIdAndUpdate(
            id, 
            { $set: { [tipo]: 'https://res.cloudinary.com/dkiiq9feu/image/upload/v1726043257/NoDisponible_jrzbvh.webp' } },
            { new: true } // Devuelve el documento actualizado
        );
        console.log(updateResult)
        if (!updateResult) {
            return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
        }
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
