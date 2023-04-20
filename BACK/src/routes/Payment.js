const { Router } = require("express");
const express = require("express");

const { getPayment, postPayment, putPayment, deletePayment } = require("../controllers/controllerPayment");
const router = Router();
router.use(express.json());

    router.get("/:id?", async (req, res) => {
      const id = req.params.id
      try {
        let resultado = await getPayment(id);
        res.status(200).json(resultado);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    });
    
    router.post("/", async (req, res) => {
      const {amount, idRestaurant, idUser, idReserve, date } = req.body;
      console.log(req.body)
      try {
        const resultado = await postPayment(idUser, idRestaurant, amount, idReserve, date);
        res.status(200).json(resultado);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
    
    router.put("/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const { name } = req.body;
    //   try {
    //     const resultado = await putPayment(id, name);
    //     res.status(200).json(resultado);
    //   } catch (error) {
    //     res.status(400).json({ error: error.message });
    //   }
    
    });
    
    router.delete("/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const resultado = await deletePayment(id);
        res.status(200).json(resultado);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
    
    module.exports = router;
    


