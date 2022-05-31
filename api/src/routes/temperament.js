const { Router } = require('express');
const router = Router();
const {Temperament} = require('../db');
const axios = require("axios");

const api_key = "d0ca73ad-ed44-4042-800e-7e678dc1959d"



router.get("/", async(req, res, next) => { // /temperament
    try {

        let temperamentsDb = await Temperament.findAll();

        if(temperamentsDb.length > 0){
            return res.json(temperamentsDb)
        }

        const allTemperaments = [];        
        const breeds = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);

        let temperaments = breeds.data.map(e => e.temperament); // arreglo de strings
        temperaments = temperaments.join(", ").split(", ") // agrego ", " en el join para luego que me quede parejo en el split(", ")
        temperaments = temperaments.filter(e => e.length > 0) // elimino los ""
        temperaments.forEach(e => allTemperaments.push({name: e}))
        allTemperaments.forEach(async(e) => {
                await Temperament.findOrCreate(
                {
                    where: {name: e.name}
                    }
            )
        })
        temperamentsDb = await Temperament.findAll();    
        // console.log(temperamentsDb.length)    
        return res.json(temperamentsDb)
   
    } catch (error) {
       return next(error)
    }
}) 

/* 
[ ] GET /temperament:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/





module.exports = router;