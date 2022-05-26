const { Router } = require('express');
const router = Router();
const { Dog, Temperament, Breed } = require('../db');


router.post("/", async (req, res, next) => { // /dog
    const {name, height, weight, life_span, temperament} = req.body; // temperament es uno o mas de un id
    let newBreed = {}
    try{
        if(name, height, weight){
            newBreed = await Breed.create({
                name, height, weight, life_span: life_span ? life_span : null
            })
        }
        if(temperament){
            await newBreed.addTemperaments(temperament)
            }
        res.json(newBreed)
    }catch(error){
        next(error)
    }
}) // /dog


/* 

[ ] POST /dog:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos

Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
Posibilidad de seleccionar/agregar uno o más temperamentos
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