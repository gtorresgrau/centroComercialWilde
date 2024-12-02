import formidable from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('Request Method:', req.method);

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

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error procesando el formulario' });
      }

      console.log('Fields:', fields);
      console.log('Files:', files);

      const { subject, message, emails } = fields;
      if (!subject || !message || !emails) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
      }

      const emailList = JSON.parse(emails);

      let attachment = null;
      if (files.image) {
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(files.image.mimetype)) {
          return res.status(400).json({ error: 'Invalid file type' });
        }
        if (files.image.size > 5 * 1024 * 1024) {
          return res.status(400).json({ error: 'File size exceeds limit' });
        }

        const filePath = files.image.filepath;
        const fileContent = fs.readFileSync(filePath);
        attachment = {
          filename: files.image.originalFilename,
          content: fileContent,
          contentType: files.image.mimetype,
        };
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
              subject,
              html: `<p>${message}</p>`,
              attachments: attachment ? [attachment] : [],
            });
          })
        );

        if (files.image) {
          fs.unlink(files.image.filepath, (err) => {
            if (err) console.error('Error deleting temporary file:', err);
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
