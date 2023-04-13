const { Router } = require("express");
const express = require("express");
const mercadopago = require("mercadopago");
const { webhookMercadopago } = require("../controllers/controllerPaymentSatus");
require("dotenv").config();
const {MERCADOPAGO_KEY} = process.env


const router = Router();
router.use(express.json());

/* ----------MERCADOPAGO---------- */

router.post("/", webhookMercadopago);




module.exports = router
