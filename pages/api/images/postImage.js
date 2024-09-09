import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import multiparty from 'multiparty';

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

export default async function POST(req) {
    try {
        // Usamos multiparty para manejar el form data
        const form = new multiparty.Form();
        console.log(form)
        
        // Promisificamos el manejo del form para usar async/await
        const data = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const { file } = data.files;
console.log(data.files)
        if (!file || file.length === 0) {
            return NextResponse.json({ error: 'No se ha subido la imagen' }, { status: 400 });
        }

        // Tomamos el primer archivo en caso de que haya varios
        const imageFile = file[0];

        // // Subimos la imagen a Cloudinary
        // const response = await cloudinary.uploader.upload(imageFile.path, {
        //     folder: 'Products'
        // });

        return NextResponse.json({
            preview: response.secure_url.toString(),
            name: response.public_id.toString(),
            isURL: true
        });

    } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 });
    }
}
