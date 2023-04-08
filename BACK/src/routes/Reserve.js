const { Router } = require("express");
const express = require("express");
const {
  postReserve,
  getReserve
  //putReserve,
} = require("../controllers/controllerReserve");

const router = Router();
router.use(express.json());

router.post("/:id", async (req, res) => {
  const  idRestaurant  = req.params.id;
  const { user, date, time, table } = req.body;

  try {
    let resultado = await postReserve(user, date, time, table, idRestaurant);
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

module.exports = router;
