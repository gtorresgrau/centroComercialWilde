/* eslint-disable import/no-anonymous-default-export */
//const { SENDER, PASSWORD, TO} = process.env;

export default function (req, res) {
  let nodemailer = require('nodemailer')
  
  console.log('data:',data, 'req:',req);
  
  const SENDER = 'programundo.dev@gmail.com'
  const PASSWORD = 'PrograMundo2023GME'
  const TO = 'gonzalotorresgrau@gmail.com'
  
  console.log('sender:',SENDER,'pass:',PASSWORD,'TO:',TO);

  const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp-mail.outlook.com",
    auth: {
      user: SENDER,
      pass: PASSWORD,
    },
    secure: false,
  })

  const mailData = {
    from: SENDER,
    to: TO,
    subject: `Message From Centro Comercial Wilde Website`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<p>Name: ${req.body.name}</p><p>Email: ${req.body.email}</p><p>Message: ${req.body.message}</p>`
  }
  transporter.sendMail(mailData, function (err, info) {
    if (err)
      console.log('error:' + err)
    else
      console.log('info:' + info.response)
  })
  res.status(200)
}