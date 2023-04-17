const { Router } = require("express");
const express = require("express");
const {
  getNotification,
  postNotification,
  deleteNotification,
} = require("../controllers/controllerNotification");

const router = Router();
router.use(express.json());

router.post("/:id", async (req, res) => {
  const idUsers = req.params.id
  const { message } = req.body;
  console.log(idUsers)
  console.log(message);
  try {
    let resultado = await postNotification(message, idUsers);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id?", async (req, res) => {
  const id = req.params.id;
  try {
    let resultado = await getNotification(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id?", async (req, res) => {
  const idUser = req.params.id;
  console.log(idUser)
  const { idNotification } = req.body
  console.log(idNotification)

  try {
    let resultado = await deleteNotification(idUser,idNotification);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
