const { Router } = require('express');
const router = Router();
const { Dog, Temperamento, Raza } = require('../db');



router.get("/", async(req, res, next) => {
    res.json(await Temperamento.findAll())
})

router.post("/", async(req, res, next) => {
    const {nombre} = req.body;
    try{
        const newTemperament = await Temperamento.create({
            nombre
        })
        res.json(newTemperament)
    }catch(e){
        res.send(e)
    }
})




module.exports = router;