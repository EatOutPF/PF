const { Router } = require("express");
const express = require("express");
const webhook = require("../controllers/controllerPaymentSatus");
require("dotenv").config();

const router = Router();
router.use(express.json());

let resultado

/* ----------MERCADOPAGO---------- */

router.post("/", async (req, res) => {
    var data = req.body
    console.log(`** El ID de pago es: ${data} **`)
    try {
    resultado = await webhook(data)  
    res.sendStatus(200)
    } catch (error) {
       console.log(error) 
    }
});

router.get("/", async (req, res) => {
    res.status(200).json(resultado)
})


module.exports = router
