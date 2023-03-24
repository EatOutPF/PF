const { Router } = require("express");
const express = require("express");
const {
  getPaymentMethods,
  postPaymentMethods,
  putPaymentMethods,
  deletePaymentMethods,
} = require("../Controllers/controllerPaymentMethods");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  let { name } = req.body
  try {
    let resultado = await postPaymentMethods(name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    let resultado = await getPaymentMethods(name);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;

    try {
      let resultado = await putPaymentMethods(id, name);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  })

  router.delete("/:id", async (req, res) => {
    let { id } = req.params;

    try {
      let resultado = await deletePaymentMethods(id)
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }

  })


module.exports = router;
