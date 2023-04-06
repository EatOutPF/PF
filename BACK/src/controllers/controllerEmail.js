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
    email, name, price
) => {
    const date = "4 de febrero"
    const time = "11:50am"

//   const userMessage = {
//     from: EMAIL,
//     to:  email,   //user.email,
//     subject: "Confirmación de reserva",
//     text: `¡Hola ${user.name}! Tu reserva en ${restaurant.name} ha sido confirmada.`,
//     html: `<p>¡Hola ${user.name}!</p><p>Tu reserva en ${restaurant.name} para el ${date} a las ${time} ha sido confirmada.</p>`,
//   };

  const restaurantMessage = {
    from: EMAIL,
    to: email,
    subject: "Nueva reserva",
    text: `¡Hola! Has recibido una nueva reserva para ${name}.`,
    html: `<p>¡Hola!</p><p>Has recibido una nueva reserva para ${name}.</p>
            <li>
            <ul>Precio : ${price}</ul>
            <ul> Fecha y hora: ${date}, ${time}</ul>
            </li>`,
  };

  // await transporter.sendMail(userMessage);
  await transporter.sendMail(restaurantMessage);
};

module.exports = { sendConfirmationEmail };
