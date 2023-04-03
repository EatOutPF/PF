const { Router } = require("express");
const express = require("express");
const decode = require("../firebase/decode");
const cors = require("cors")

const {
  getUsers,
  postUsers,
  putUsers,
  activeUsers,
} = require("../controllers/controllerUsers");

const router = Router();
router.use(express.json());
router.use(cors())

router.get("/", async (req, res) => {
  let token = req.headers.authorization.split(' ')[1]

  try {
    let user = await decode(token)
    let resultado = await getUsers(user);
  
    res.status(200).json(resultado);
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body)
  try {
    let resultado = await postUsers(req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  if (active !== undefined) {
    try {
      let resultado = await activeUsers(id, active);
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



