const { Router } = require("express");
const express = require("express");

const {getUsers} = require("../Controllers/controllerUsers")

const router = Router();
router.use(express.json());

router.get("/", async (req, res) => {
    const  { name } = req.query
    console.log(name)
    try {
      let resultado = await getUsers(name);
      console.log(resultado)
      res.status(200).json(resultado);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

router.post("/", async (req, res) =>{

    try {
        
    } catch (error) {
        
    }
})