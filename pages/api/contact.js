require('dotenv').config();
let nodemailer = require('nodemailer')
const { SENDER, PASSWORD, TO} = process.env;

export default function (req, res) {
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: SENDER,
      pass: PASSWORD,
    },
    secure: true,
  })
  let mailData ={}

  if('sorteo' in req.body){
    mailData = {
      from: SENDER,
      to: TO,
      subject: `Sorteo expensas CHW`,
      html: `<p>La Persona se ha suscripto al sorteo desde el sitio web:</p><p>Nombre: ${req.body.nombre + ' ' +req.body.apellido}</p><p>Email: ${req.body.email}</p><p>Domicilio: Torre ${req.body.torre + ' Piso:' + req.body.piso + ' Depto:' + req.body.depto}</p><p>Terminos: ${req.body.aceptar?'Acepto participar':'yo no me anote'}</p>`,
    }
  }else{
    mailData = {
      from: SENDER,
      to: TO,
      subject: 'newsletter' in req.body? `Centro Comercial Wilde - Newsletter`: `Message From Centro Comercial Wilde Website`,
      html: 'newsletter' in req.body? `<p>El email: ${req.body.newsletter} esta interesado en que le envien informacion de los proximos eventos.</p>`:`<p>La Persona ha hecho contacto desde el sitio web:</p><p>Nombre: ${req.body.nombre}</p><p>Email: ${req.body.email}</p><p>mensaje: ${req.body.msj}</p>`,
    }
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