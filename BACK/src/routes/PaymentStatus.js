const { Router } = require("express");
const express = require("express");
const mercadopago = require("mercadopago");

const router = Router();
router.use(express.json());

/* ----------MERCADOPAGO---------- */

router.post("/", (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body)
})

module.exports = router
