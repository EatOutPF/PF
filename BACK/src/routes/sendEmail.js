const { Router } = require("express");
const express = require("express");
const { sendConfirmationEmail } = require("../controllers/controllerEmail");
const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const { email, name, price } = req.query;
  try {

     await sendConfirmationEmail(email, name, price);
    res.status(200).json("Se envio la confirmacion");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
