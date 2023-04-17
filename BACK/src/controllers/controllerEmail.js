const nodemailer = require("nodemailer");

const { EMAIL, KEY_GMAIL } = process.env;

// Configurar el transporter con los detalles del servicio de correo electrónico
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL, // Dirección de correo electrónico del remitente
    pass: KEY_GMAIL, // Contraseña de la cuenta de correo electrónico del remitente
  },
});

const sendConfirmationEmail = async (
   { mail, subject, message}
) => {

  const sendemail = {
    from: EMAIL,
    to: mail,
    subject: subject,
    text: message.text,
    html: message.html
  }

  await transporter.sendMail(sendemail);
};

module.exports = { sendConfirmationEmail };
