const { Router } = require('express');
const router = Router();
const { Dog, Temperamento, Raza } = require('../db');





/* 

[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos
*/












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