require('dotenv').config();
let nodemailer = require('nodemailer')
const { SENDER, PASSWORD, TO} = process.env;

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res) {
  //console.log(req.body)
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
      html: `
          <p>La Persona se ha suscripto al sorteo desde el sitio web:</p>
          <p>Nombre: ${req.body.nombre + ' ' + req.body.apellido}</p>
          <p>Email: ${req.body.email}</p>
          <p>Celular: ${req.body.celular}</p>
          <p>DNI: ${req.body.dni}</p>
          <p>CHW: ${req.body.chw}</p>
          ${req.body.chw
              ? `<p>Domicilio: Torre ${req.body.torre + ' Piso:' + req.body.piso + ' Depto:' + req.body.depto}</p>`
              : `<p>Domicilio: Calle ${req.body.torre + ' Altura:' + req.body.piso + ' Localidad:' + req.body.depto}</p>`
          }
          <p>Terminos: ${req.body.aceptar ? 'Acepto participar' : 'yo no me anote'}</p>
      `,
    }
  }else{
    mailData = {
      from: SENDER,
      to: TO,
      subject: 'newsletter' in req.body? `Centro Comercial Wilde - Newsletter`: `Mensaje desde Centro Comercial Wilde Website`,
      html: 
        'newsletter' in req.body
          ?`<p>El email: ${req.body.newsletter} esta interesado en que le envien informacion de los proximos eventos.</p>`
          :`<p>La Persona ha hecho contacto desde el sitio web:</p>
              <p>Nombre: ${req.body.input1}</p>
              <p>Email: ${req.body.input2}</p>
              <p>mensaje: ${req.body.input3}</p>`,
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