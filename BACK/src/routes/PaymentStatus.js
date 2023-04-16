const { Router } = require("express");
const express = require("express");
const webhook = require("../controllers/controllerPaymentSatus");
const cors = require("cors");
const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200,
  };
require("dotenv").config();

const router = Router();
router.use(express.json());
router.use(cors(corsOptions));
/* ----------MERCADOPAGO---------- */

router.post("/", async (req, res) => {
        
       let resultado = await webhook(req.body)  
        res.sendStatus(200)
});


router.get("/:id", async (req, res) => {
    let { id } = req.params

    console.log(`** El ID de pago es: ${id} **`)
    try {
    resultado = await webhook(id)  
    res.status(200).json(resultado)
    } catch (error) {
       console.log(error) 
    }
})



module.exports = router
