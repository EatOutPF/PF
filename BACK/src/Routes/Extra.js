const { Router } = require("express");
const express = require("express");
const {
    getExtra,
    postExtra,
    putExtra,
    deleteExtra
} = require("../Controllers/controllerExtra");

const router = Router();
router.use(express.json());


router.post("/", async(req,res)=>{
    const {name} = req.body
    console.log(name)
    try {
        let resultado = await postExtra(name)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get("/", async(req, res)=>{
    const {name} = req.body
    
    try {
        let resultado = await getExtra(name)
        res.status(200).json(resultado)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    let { name } = req.body;
  
      try {
        let resultado = await putExtra(id, name);
        res.status(200).json(resultado);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    })
  
    router.delete("/:id", async (req, res) => {
      let { id } = req.params;
  
      try {
        let resultado = await deleteExtra(id)
        res.status(200).json(resultado);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
  
    })


module.exports = router