const { Router } = require("express");
const express = require("express");
const cors = require("cors")
const { getUsers } = require("../controllers/controllerUserGmail");

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
const router = Router();
router.use(express.json());
router.use(cors(corsOptions));

router.post("/", async (req, res) => {
    try {
      let resultado = await getUsers(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router
