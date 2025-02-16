import { formidable } from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser
  },
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    if (!process.env.SENDER || !process.env.PASSWORD) {
      console.error('Missing environment variables for email credentials.');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error procesando el formulario' });
      }

      const { subject, message, emails } = fields;

      if (!subject || !message || !emails) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
      }

      let emailList;
      try {
        emailList = JSON.parse(emails);
        if (!Array.isArray(emailList) || emailList.some((email) => typeof email !== 'string')) {
          throw new Error('Invalid email list');
        }
      } catch (error) {
        return res.status(400).json({ error: 'Invalid emails format' });
      }

      let embeddedImageTag = '';
      let attachments = [];

      if (files.image) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf'];
        if (!validTypes.includes(files.image[0].mimetype)) {
          return res.status(400).json({ error: 'Invalid file type' });
        }

        if (files.image[0].size > 5 * 1024 * 1024) {
          return res.status(400).json({ error: 'File size exceeds limit' });
        }

        const filePath = files.image[0].filepath;
        const fileContent = fs.readFileSync(filePath);
        const mimeType = files.image[0].mimetype;
        const fileName = files.image[0].originalFilename;

        // Imagen embebida (CID para Gmail)
        const cid = 'ccw-image-embed'; // Debe ser único
        embeddedImageTag = `<img src="cid:${cid}" alt="Imagen" style="max-width: 100%; height: auto;">`;

        // Agregar como adjunto (Gmail requiere Content-ID para imágenes embebidas)
        attachments = [
          {
            filename: fileName,
            content: fileContent,
            contentType: mimeType,
            cid: cid, // Necesario para vincular la imagen al CID en el cuerpo
          },
          {
            filename: fileName,
            content: fileContent,
            contentType: mimeType,
          },
        ];
      }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SENDER,
          pass: process.env.PASSWORD,
        },
      });

      try {
        await Promise.all(
          emailList.map(async (email) => {
            await transporter.sendMail({
              from: process.env.SENDER,
              to: email,
              subject: `${subject}`,
              html: `
                <a href="https://centrocomercialwilde.com" title='centro comercial wilde'> CENTRO COMERCIAL WILDE <h1> </a>
                <p>${message}</p>
                <a href="https://centrocomercialwilde.com" title='centro comercial wilde'> ${embeddedImageTag}</a>
              `,
              attachments: attachments,
            });
          })
        );

        if (files.image && files.image[0] && files.image[0].filepath) {
          const filePath = files.image[0].filepath;
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting temporary file:', err);
            }
          });
        }

        res.status(200).json({ message: 'Correos enviados exitosamente' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error al enviar los correos' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Método no permitido' });
  }
}
