const { Router } = require("express");
const express = require("express");
const {
  getSection,
  postSection,
  putSection,
  deleteSection,
} = require("../controllers/controllerSection");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  let { name } = req.body
  try {
    let resultado = await postSection(name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    let resultado = await getSection(name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

    try {
      let resultado = await putSection(id, name);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  })

  router.delete("/:id", async (req, res) => {
    let { id } = req.params;

    try {
      let resultado = await deleteSection(id)
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }

  })


module.exports = router;
