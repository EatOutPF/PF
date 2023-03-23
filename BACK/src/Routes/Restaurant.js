const { Router } = require("express");
const express = require("express");
const {
  getRestaurant,
  postRestaurant,
  putRestaurant,
  activeRestaurant,
} = require("../Controllers/controllerRestaurant");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  try {
    let resultado = await postRestaurant(req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    let resultado = await getRestaurant(name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { active } = req.body;

  if (active !== undefined) {
    try {
      let resultado = await activeRestaurant(id, active);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    try {
      let resultado = await putRestaurant(id, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
});

module.exports = router;
