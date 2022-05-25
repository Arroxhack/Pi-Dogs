const { Router } = require('express');
const router = Router();
const { Dog, Temperamento, Raza } = require('../db');
const axios = require("axios");

const api_key = "d0ca73ad-ed44-4042-800e-7e678dc1959d"



router.get("/", async(req, res, next) => {  // /dogs
    const {name} = req.query;
    if(name){
        try{
            const dogsWithName = [];
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
            response.data.forEach(e => {
                if(e.name.toLowerCase().includes(name.toLowerCase())){
                    dogsWithName.push({
                        imagen: e.image.url,
                        nombre: e.name,
                        temperamento: e.temperament,
                        peso: e.weight.metric
                    })
                }
            })
            return res.json(dogsWithName.length > 0 ? dogsWithName : "No contamos con dicha raza")
        }catch(error){
           return next(error)
        }
    }
    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
        const responseMapeada = response.data.map(e => {
            let newObj = {
                imagen: e.image.url,
                nombre: e.name,
                temperamento: e.temperament,
                peso: e.weight.metric
            };
            return newObj;
        })
        res.json(responseMapeada)
    } catch (error) {
        next(error)
    }
})

/* 
[ ] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal
[ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado
Imagen
Nombre
Temperamento
Peso
*/

router.get("/:idRaza", async(req, res, next) => { // primero hago la busqueda en mi base de datos
    const {idRaza} = req.params;
    const idRazaNum = Number(idRaza);
    if(idRaza){
        try{
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);
            const responseFiltrada = response.data.filter(e => e.id === idRazaNum);
            const responseMapeada = responseFiltrada.map(e => {
                let newObj = {
                    imagen: e.image.url,
                    nombre: e.name,
                    temperamento: e.temperament,
                    altura: e.height.metric,
                    peso: e.weight.metric,
                    años_de_vida: e.life_span
                };
                return newObj;
            })
            res.json(responseMapeada.length > 0 ? responseMapeada : "El id ingresado no corresponde a una raza")
        }catch(error){
            return next(error)
        }
    }
})

/* 
[ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados
imagen
nombre
temperamento
Altura
Peso
Años de vida
*/


// router.get("/", async(req, res, next) => {
//     return Dog.findAll()
//     .then(dogs => {
//         res.json(dogs)
//     })
// })

// router.get("/", async(req, res, next) => { // /dogs?name="...":
//     res.send("Soy get /dogs")
// })

// router.get("/", async(req, res, next) => {
//     axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${raza_perro}`)
// })

// router.get("/:id", async(req, res, next) => {
//     res.send("Soy get /dogs/id")
// })

router.post("/", async(req, res, next) => {
    const {name} = req.body;
    try{
        const newDog = await Dog.create(
            {name}
        )
        res.json(newDog)
    }catch(error){
        next(error)
    }
})


module.exports = router;