const { Router } = require("express");
const express = require("express");
const { sendConfirmationEmail } = require("../controllers/controllerEmail");
const cors = require("cors");

const router = Router();

const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200,
  };
router.use(express.json());
router.use(cors(corsOptions));
router.post("/", async (req, res) => {
  const { email, name, price } = req.body;
  try {

     await sendConfirmationEmail(email, name, price);
    res.status(200).json("Se envio la confirmacion");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
