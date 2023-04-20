const { Router } = require("express");
const express = require("express");

const { getPayment, postPayment, putPayment, deletePayment } = require("../controllers/controllerPayment");

const router = Router();
router.use(express.json());



module.exports = router;
