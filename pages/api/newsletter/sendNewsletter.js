import formidable from 'formidable';
import fs from 'fs';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Desactiva el bodyParser de Next.js para manejar el archivo manualmente
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    console.log('back:', req.body) 

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error procesando el formulario' });
      }

      const { subject, message, emails } = fields;
      const emailList = JSON.parse(emails);

      if (!subject || !message || !emailList || emailList.length === 0) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
      }

      let attachment = null;
      if (files.image) {
        const filePath = files.image.filepath; // Ruta del archivo temporal
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
        auth: {
          user: process.env.SENDER,
          pass: process.env.PASSWORD,
        },
        secure: true,
      });

      try {
        await Promise.all(
          emailList.map(async (email) => {
            const mailData = {
              from: process.env.SENDER,
              to: email,
              subject,
              html: `<p>${message}</p>`,
              attachments: attachment ? [attachment] : [],
            };

            await transporter.sendMail(mailData);
          })
        );

        res.status(200).json({ message: 'Correos enviados exitosamente' });
      } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Error al enviar los correos' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Método no permitido' });
  }
}
