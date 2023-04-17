const { Router } = require("express");
const express = require("express");
const decode = require("../firebase/decode");
const cors = require("cors")
const mongoose = require("mongoose")
const {
  getUsers,
  postUsers,
  putUsers,
  activeUsers,
} = require("../controllers/controllerUsers");

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
const router = Router();
router.use(express.json());
router.use(cors(corsOptions));

router.get("/:id?", async (req, res) => {
  let token = req.headers.authorization?.split(" ")[1];
  let id = req.params.id;
  try {
    if (token) {
      let user = await decode(token);
      let resultado = await getUsers(user);
      res.status(200).json(resultado);
    } else if (id) {
      resultado = await getUsers(id);
      res.status(200).json(resultado);
    } else {
      resultado = await getUsers();
      res.status(200).json(resultado);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let resultado = await postUsers(req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {

  const { id } = req.params;
  console.log(mongoose.Types.ObjectId.isValid(id))
  const { active } = req.body;
  console.log(active)
  if (active !== undefined) {
   
    try {

  
      let resultado = await activeUsers(id, active);
      console.log(resultado)
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      let resultado = await putUsers(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
});

module.exports = router;
