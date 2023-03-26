const { Router } = require("express");
const express = require("express");

const { getMenu, postMenu, putMenu, deleteMenu } = require("../Controllers/controllerMenu");
const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    let resultado = await getMenu(name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const name = req.body;
  try {
    const resultado = await postMenu(name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const resultado = await putMenu(id, name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await deleteMenu(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
