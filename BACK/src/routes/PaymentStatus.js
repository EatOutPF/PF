const { Router } = require("express");
const express = require("express");
const mercadopago = require("mercadopago");
require("dotenv").config();
const {MERCADOPAGO_KEY} = process.env

const router = Router();
router.use(express.json());

/* ----------MERCADOPAGO---------- */

router.post("/", (req, res) => {
    
    console.log(req.body);

const { body } = req;
//  const signature = req.header('x-signature');

  // Verifica la firma de la solicitud
  //const hash = crypto.createHmac('sha256', MERCADOPAGO_KEY)
    //.update(JSON.stringify(body))
    //.digest('hex');

  //if (hash === signature) {
    // La firma es válida, procesa el pago y actualiza el estado de la orden de compra
    // ...
    // Retorna una respuesta exitosa para indicar a MercadoPago que la solicitud fue procesada correctamente
    res.status(200).json(body);
  //} else {
    // La firma es inválida, rechaza la solicitud
    //res.sendStatus(400);
  }

});




module.exports = router
