const { Router } = require("express");
const nodemailer = require("nodemailer");
const express = require("express");
const router = Router();
router.use(express.json());
const { EMAIL, KEY_GMAIL } = process.env;


router.post("/", (req, res) => {
  const {email} = req.body;
  

  // Configurar el transporter con los detalles del servicio de correo electrónico
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL, // Dirección de correo electrónico del remitente
      pass: KEY_GMAIL, // Contraseña de la cuenta de correo electrónico del remitente
    },
  });

  // Crear la plantilla del correo electrónico
  let mailOptions = {
    from: "eatoutpf@gmail.com",
    to: email,
    subject: "Confirmación de respuesta",
    text: "Gracias por tu respuesta.",
  };

  // Enviar el correo electrónico utilizando el transporter y la plantilla creados
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(200).json("Correo electrónico enviado: " + info.response);
      }
  
  });


});

module.exports = router;
