const { Router } = require("express");
const express = require("express");
const favorite = require("../controllers/controllerFavorite");

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
    console.log(req.body)
const {restaurant, user} = req.body

try {
    const resultado = await favorite(restaurant, user)
    res.status(200).json(resultado)
} catch (error) {
    res.status(400).json({error: error.message})
}
})

module.exports = router