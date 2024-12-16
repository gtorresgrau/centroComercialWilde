import { v2 as cloudinary } from 'cloudinary';
import multiparty from 'multiparty';
import mongoose from 'mongoose';
import Local from '../../../src/models/locales'; // Solo necesario si quieres manejar la base de datos en la misma API

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
  api: {
    bodyParser: false, // Deshabilita el bodyParser de Next.js para manejar nosotros mismos el parsing del body
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
        
      // Conectamos a la base de datos solo si es necesario
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
      }
      // Usamos multiparty para manejar el form data
      const form = new multiparty.Form();
      // Promisificamos el manejo del form para usar async/await
      const data = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      });
      const { file } = data.files;
      const productId = data.fields.id ? data.fields.id[0] : null; // ID del producto si se proporciona
      const tipo = data.fields.tipo[0]; // Tipo de la imagen (fotoLocal, logo, etc.)
      if (!file || file.length === 0) {
        return res.status(400).json({ error: 'No se ha subido la imagen' });
      }

      const folder = (tipo === 'fotoLocal' && 'LOCAL CCW') || (tipo === 'logoLocal' && 'LOGOS CCW');
      // Tomamos el primer archivo en caso de que haya varios
      const imageFile = file[0];
      // Subimos la imagen a Cloudinary
      const response = await cloudinary.uploader.upload(imageFile.path, {
        folder: folder
      });
      //console.log(response)
      
      // Si hay un ID de producto, actualizamos el producto existente
      if (productId) {
        //console.log('aca')
        const updateResult = await Local.findByIdAndUpdate(
          productId,
          { $set: { [tipo]: response.secure_url } },
          { new: true } // Devuelve el documento actualizado
        );

        if (!updateResult) {
          return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
        }

        return res.status(200).json({
          preview: response.secure_url.toString(),
          name: response.public_id.toString(),
          isURL: true
        });
      } else {
        // Si no hay ID de producto, solo devolvemos la URL de la imagen
        return res.status(200).json({
          preview: response.secure_url.toString(),
          name: response.public_id.toString(),
          isURL: true
        });
      }

    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary o actualizar la base de datos:', error);
      return res.status(500).json({ error: 'Error al subir la imagen o actualizar la base de datos' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
