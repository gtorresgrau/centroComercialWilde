require('dotenv').config();
let nodemailer = require('nodemailer')
const { SENDER, PASSWORD, TO} = process.env;

export default function (req, res) {
  
  console.log('req:',req.body);
  
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
    subject: `Message From Centro Comercial Wilde Website`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<p>Name: ${req.body.input1}</p><p>Email: ${req.body.input2}</p><p>Message: ${req.body.input3}</p>`
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