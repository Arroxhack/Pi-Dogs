const { Router } = require('express');
const router = Router();
const { Dog, Temperament, Breed } = require('../db');
const {Op} = require("sequelize");
const axios = require("axios");

const api_key = "d0ca73ad-ed44-4042-800e-7e678dc1959d"

// 1:18:15 filtro ascendetne y descendente


router.get("/", async(req, res, next) => {  // /dogs y /dogs?name=razaDeApi o razaCreada
    const {name} = req.query;
    if(name){
            const promiseApiDogs = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
            const promiseDbDogs = Breed.findAll(
                {where: {name: {
                    [Op.iLike]: `%${name}%`
                }},
                include: Temperament,
                raw: true, // para poder hacer console.log
                nest:true  // para que no se me aniden mas de un temperamento
                }
            )
            Promise.all([
                promiseApiDogs,
                promiseDbDogs
            ])
                .then((response) => {
                    const [apiDogs, dbDogs] = response
                    let dogsWithName = []
                    apiDogs.data.forEach(e => {
                        if(e.name.toLowerCase().includes(name.toLowerCase())){
                            dogsWithName.push({
                                image: e.image.url,
                                name: e.name,
                                temperament: e.temperament,
                                weight: e.weight.metric
                            })
                        }
                    })
                    dbDogs.forEach(e => {
                            dogsWithName.push({
                                name: e.name,
                                temperament: e.temperaments.name,
                                weight: e.weight
                            })
                    })
                // console.log(apiDogs.data)
                // console.log(dbDogs)
                return res.json(dogsWithName.length > 0 ? dogsWithName : "No contamos con esa Raza")
                })
                .catch(error => {
                    return next(error)
                })
    }
    if(!name){
        const promiseApiDogs = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
        const promiseDbDogs = Breed.findAll({include: Temperament})
        Promise.all([
            promiseApiDogs,
            promiseDbDogs
        ])
        .then((response) => {
            const [apiDogs, dbDogs] = response
            let allDogs = []
            apiDogs.data.forEach(e => {
                allDogs.push({
                    image: e.image.url,
                    name: e.name,
                    temperament: e.temperament,
                    weight: e.weight.metric
                })
            })
            dbDogs.forEach(e => {
                allDogs.push({
                    name: e.name,
                    temperament: e.temperaments[0].name,
                    weight: e.weight
                })
            })
        return res.json(allDogs)
        })
        .catch(error => {
            return next(error)
        })
        
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

router.get("/:idBreed", async(req, res, next) => { // /dogs/idDeApi o idDb // primero hago la busqueda en mi base de datos
    const {idBreed} = req.params;
    if(idBreed.length > 8){
        try{
            const myBreed = await Breed.findByPk(idBreed,{
                include: Temperament,
                raw: true,
                nest:true
            })
            const myBreedDetail = Object.assign({},
                {
                name: myBreed.name,
                temperament: myBreed.temperaments.name,
                height: myBreed.height,
                weight: myBreed.weight,
                life_span: myBreed.life_span ? myBreed.life_span : null
                } 
            )
            return res.json(myBreedDetail)
        }catch(error) {
            next(error)
        }
    } else {
    const idBreedNum = Number(idBreed);
        try{
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`);
            const responseFiltrada = response.data.filter(e => e.id === idBreedNum);
            const responseMapeada = responseFiltrada.map(e => {
                let newObj = {
                    image: e.image.url,
                    name: e.name,
                    temperament: e.temperament,
                    height: e.height.metric,
                    weight: e.weight.metric,
                    life_span: e.life_span
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

// router.post("/", async(req, res, next) => {
//     const {name} = req.body;
//     try{
//         const newDog = await Dog.create(
//             {name}
//         )
//         res.json(newDog)
//     }catch(error){
//         next(error)
//     }
// })


module.exports = router;