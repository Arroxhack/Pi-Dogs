const { Router } = require('express');
const router = Router();
const {Temperament, Breed } = require('../db');
const {Op} = require("sequelize");
const axios = require("axios");

const api_key = "d0ca73ad-ed44-4042-800e-7e678dc1959d"


router.get("/", async(req, res, next) => {  // /dogs y /dogs?name=razaDeApi o razaCreada
    const {name} = req.query;
    if(!name){
        const promiseApiDogs = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${api_key}`)
        const promiseDbDogs = Breed.findAll(
            {include: Temperament,
            raw: true, // para poder hacer console.log
            nest:true  // para que no se me aniden mas de un temperamento
            })
        Promise.all([
            promiseApiDogs,
            promiseDbDogs
        ])
        .then((response) => {
            const [apiDogs, dbDogs] = response
            let allDogs = []
            apiDogs.data.forEach(dog => {
                allDogs.push({
                    id: dog.id,
                    image: dog.image.url,
                    name: dog.name,
                    temperament: dog.temperament,
                    min_weight: Number(dog.weight.metric.split(" - ")[0]),
                    max_weight: Number(dog.weight.metric.split(" - ")[1])
                })
            })
            dbDogs.forEach(dog => {
                allDogs.push({
                    id: dog.id,
                    name: dog.name,
                    temperament: dog.temperaments.name,
                    min_weight: dog.weight,
                    max_weight: dog.weight
                })
            })
        // console.log(apiDogs.data)
        // console.log(dbDogs)
        return res.json(allDogs)
        })
        .catch(error => {
            return next(error)
        })    
    }
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
                apiDogs.data.forEach(dog => {
                    if(dog.name.toLowerCase().includes(name.toLowerCase())){
                        dogsWithName.push({
                            id: dog.id,
                            image: dog.image.url,
                            name: dog.name,
                            temperament: dog.temperament,
                            min_weight: Number(dog.weight.metric.split(" - ")[0]),
                            max_weight: Number(dog.weight.metric.split(" - ")[1])
                        })
                    }
                })
                dbDogs.forEach(dog => {
                        dogsWithName.push({
                            id: dog.id,
                            name: dog.name,
                            temperament: dog.temperaments.name,
                            min_weight: dog.weight,
                            max_weight: dog.weight
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
})


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
                id: myBreed.id,
                name: myBreed.name,
                temperament: myBreed.temperaments.name,
                height: myBreed.height,
                min_weight: myBreed.weight,
                max_weight: myBreed.weight,
                life_span: myBreed.life_span ? myBreed.life_span : null
                } 
            )
            return res.json(myBreedDetail ? myBreedDetail : "El id ingresado no corresponde a una raza")
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
                    id: e.id,
                    image: e.image.url,
                    name: e.name,
                    temperament: e.temperament,
                    height: e.height.metric,
                    min_weight: Number(e.weight.metric.split(" - ")[0]),
                    max_weight: Number(e.weight.metric.split(" - ")[1]),
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


module.exports = router;