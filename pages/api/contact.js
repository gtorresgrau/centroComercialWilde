require('dotenv').config();
let nodemailer = require('nodemailer')
const { SENDER, PASSWORD, TO} = process.env;

export default function (req, res) {
  
  console.log('req:',req.body);
  
  console.log('contacto 2');    

  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: SENDER,
      pass: PASSWORD,
    },
    secure: true,
  })
    
  const mailData = {
    from: SENDER,
    to: TO,
    subject: req.body.newsletter ? `Centro Comercial Wilde - Newsletter`: `Message From Centro Comercial Wilde Website`,
    html: req.body.newsletter ? `<p>El email: ${req.body.newsletter} esta interesado en que le envien informacion de los proximos eventos.</p>`:`<p>La Persona ha hecho contacto desde el sitio web:</p><p>Nombre: ${req.body.input1}</p><p>Email: ${req.body.input2}</p><p>mensaje: ${req.body.input3}</p>`,
  }

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log('error:' + err);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('info:' + info.response);
      res.status(200).send('Correo enviado exitosamente');
    }
  })
}