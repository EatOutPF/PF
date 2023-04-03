const { Router } = require("express");
const express = require("express");
const {
  postReviews,
  getReviews,
  putReviews,
} = require("../controllers/controllerReview");

const router = Router();
router.use(express.json());

router.post("/:id", async (req, res) => {
  const  idRestaurant  = req.params.id;
  const { review, score, user } = req.body;

  try {
    let resultado = await postReviews(review, score, user, idRestaurant);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let resultado = await getReviews();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { review } = req.body;
  try {
    let resultado = await putReviews(id, review);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
