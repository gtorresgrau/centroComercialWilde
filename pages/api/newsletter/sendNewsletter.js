// pages/api/newsletter/sendNewsletter.js
import nodemailer from 'nodemailer';
const { SENDER, PASSWORD, TO} = process.env;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { subject, message, emails } = req.body;

    // Verifica que se reciban todos los datos necesarios
    if (!subject || !message || !emails || emails.length === 0) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
    }

    // Configura el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: SENDER,
        pass: PASSWORD,
      },
      secure: true,
    });

    try {
      // Envía los correos electrónicos
      await Promise.all(emails.map(async (email) => {
        const unsubscribeLink = `http://localhost:3000/unsubscribe/${encodeURIComponent(email)}`;
        const mailData = {
          from: SENDER,
          to: email,
          subject,
          html: `<p>${message}</p>
            <p>Si no deseas recibir más correos, puedes darte de baja aquí: <a href="${unsubscribeLink}">Darse de baja</a></p>`,
        };

        await transporter.sendMail(mailData);
      }));

      res.status(200).json({ message: 'Correos enviados exitosamente' });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Error al enviar los correos' });
    }
  } else {
    // Maneja cualquier otro método HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Método no permitido' });
  }
}
