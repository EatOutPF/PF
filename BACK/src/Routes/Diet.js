const { Router } = require("express");
const express = require("express");
const {
    getDiet,
    postDiet,
    putDiet,
    deleteDiet
} = require("../Controllers/controllerDiet");

const router = Router();
router.use(express.json());


router.post("/", async(req,res)=>{
    const {name} = req.body
    console.log(name)
    try {
        let resultado = await postDiet(name)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get("/", async(req, res)=>{
    const {name} = req.body
    
    try {
        let resultado = await getDiet(name)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    let { name } = req.body;
  
      try {
        let resultado = await putDiet(id, name);
        res.status(200).json(resultado);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    })
  
    router.delete("/:id", async (req, res) => {
      let { id } = req.params;
  
      try {
        let resultado = await deleteDiet(id)
        res.status(200).json(resultado);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
  
    })


module.exports = router