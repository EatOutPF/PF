const { Router } = require("express");
const express = require("express");
const {
  postReserve,
  getReserve,
  deleteReserve
} = require("../controllers/controllerReserve");
const {Reserva} = require("../db")

const router = Router();
router.use(express.json());

router.post("/:id", async (req, res) => {
  const  idRestaurant  = req.params.id;
  
  const { user, table, date } = req.body;

  try {
    let resultado = await postReserve(user, table, date, idRestaurant);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
    
  try {

    let resultado = await getReserve();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// router.put("/:id", async (req, res) => {
//   let { id } = req.params;
//   let { review } = req.body;
//   try {
//     let resultado = await putReserve(id, review);
//     res.status(200).json(resultado);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

router.delete("/:id", async (req, res) => {

  const { id } = req.params;
  //console.log(req.params)
  try {
    const reserva = await deleteReserve(id)
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).send(error.message);
  }

});

module.exports = router;
