import React, {useState, useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import { postNewBreed, getAllTemperaments } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';


export default function Form() {

const [errors, setErrors] = useState({})

/*  name: "", //name: lo que escribaa
    min_height: 1,
    max_height: 1,
    min_weight: 1,
    max_weight: 1,
    life_span: 1,
    temperament: [],
    image: "" */

function validate(newBreed){
    let errors = {};

    if(!/^[a-zA-Z\s]*$/.test(newBreed.name)){
        errors.name = "Completar este campo con caracteres alfabeticos"
    }

    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.min_height)){
        errors.min_height = "Completar con un valor numerico entre 1 y 100 que no supere la altura maxima"
    } 
    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.max_height)){
        errors.max_height = "Completar con un valor numerico entre 1 y 100 que supere la altura minima"
    }
    if(parseInt(newBreed.min_height) > parseInt(newBreed.max_height)){
        errors.min_height = "Completar con un valor numerico entre 1 y 100 que no supere la altura maxima"
        errors.max_height = "Completar con un valor numerico entre 1 y 100 que supere la altura minima"
    }

    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.min_weight)){
        errors.min_weight = "Completar con un valor numerico entre 1 y 100 que no supere el peso maxima"
    }
    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.max_weight)){
        errors.max_weight = "Completar con un valor numerico entre 1 y 100 que supere el peso maximo"
    }
    if(parseInt(newBreed.min_weight) > parseInt(newBreed.max_weight)){
        errors.min_weight = "Completar con un valor numerico entre 1 y 100 que no supere el peso maximo"
        errors.max_weight = "Completar con un valor numerico entre 1 y 100 que supere el peso maximo"
    }

    if(newBreed.life_span && !/\b([1-9]|[12][0-9]|3[0])\b/.test(newBreed.life_span)){
        errors.life_span = "Si desea completarlo, hacerlo con un valor numerico entre 1 y 30"
    }

    if(newBreed.image && !/[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/.test(newBreed.image)){
        errors.image = "Si desea completarlo, hacerlo con una url https valida. Ej:https://placedog.net/600/100"
    }

    return errors
}

const [temperamentName, setTemperamentName] = useState({
    name: []
})

const [newBreed, setNewBreed] = useState({
    name: "",
    min_height: 1,
    max_height: 1,
    min_weight: 1,
    max_weight: 1,
    life_span: "",
    temperament: [],
    image: ""
});

const dispatch = useDispatch()
const temperaments = useSelector(state => state.temperaments)

useEffect(() => {
    dispatch(getAllTemperaments())
}, [dispatch])

let onInputChange = (e) => { //name: lo que escribaa
    setNewBreed({
        ...newBreed,
        [e.target.name]: e.target.value // el e.target.name corresponde con la propiedad del estado en cada caso.
    })
    setErrors(validate({
        ...newBreed,
        [e.target.name]: e.target.value
    }))
}

let onSelectChange = (e) => {
    if(!newBreed.temperament.includes(e.target.value.split(",")[0]) && e.target.value !== ""){
        setNewBreed({
            ...newBreed,
            temperament: [...newBreed.temperament, e.target.value.split(",")[0]]
        })
        setTemperamentName({
            name: [...temperamentName.name, e.target.value.split(",")[1]]
        })
        console.log(temperamentName.name)
        console.log(newBreed.temperament)
    }
}

let removeTemperamentButton = (e) => {
    e.preventDefault();
        let temperamentToDeleteName = e.target.value //Active
        let temperamentToDelete = temperaments.filter(e => e.name === temperamentToDeleteName) //[0]temperamentToDelete.id y .name
        console.log(temperamentToDeleteName)
        console.log(temperamentToDelete)
        let deleteTemperament = newBreed.temperament.filter(e => e !== temperamentToDelete[0].id)
        let deleteTemperamentName = temperamentName.name.filter(e => e !== temperamentToDelete[0].name )
        setNewBreed({
            ...newBreed,
            temperament: deleteTemperament
        })
        setTemperamentName({
            name: deleteTemperamentName
        })
}

let submitDog = (e) => {
    e.preventDefault();
    console.log(newBreed)
    dispatch(postNewBreed(newBreed))
    alert(`Raza ${newBreed.name} creada con exito!`)
    setNewBreed({
        name: "",
        min_height: 1,
        max_height: 1,
        min_weight: 1,
        max_weight: 1,
        life_span: "",
        temperament: [],
        image: ""
    })
    setTemperamentName({
        name: []
    })
}


  return (
    <div>           
        <button>
            <NavLink exact to="/home">Home</NavLink>
        </button>
        <h2>Formulario de creacion de raza</h2>
        <form onSubmit={submitDog}>
            <div> *Raza:
                <input  // SI o SI
                type="text" 
                placeholder='Raza'
                value={newBreed.name}
                name= "name"
                onChange={onInputChange}/>
                {errors.name && (
                    <p style={{color:"red"}}>{errors.name}</p>
                )}
            </div>
            <div> *Altura min:
                <input // SI o SI
                type="text"
                placeholder='Altura min' 
                value={newBreed.min_height}
                name= "min_height"
                onChange={onInputChange}/> 
                {errors.min_height && (
                    <p style={{color:"red"}}>{errors.min_height}</p>
                )}
                cm
            </div>
            <div>
                *Altura max:
                <input // SI o SI
                type="text"
                placeholder='Altura max' 
                value={newBreed.max_height}
                name= "max_height"
                onChange={onInputChange}/>
                {errors.max_height && (
                    <p style={{color:"red"}}>{errors.max_height}</p>
                )}
                cm
            </div>
            <div> *Peso min:
                <input // SI o SI
                type="text"
                placeholder='Peso min' 
                value={newBreed.min_weight}
                name= "min_weight"
                onChange={onInputChange}/>
                {errors.min_weight && (
                    <p style={{color:"red"}}>{errors.min_weight}</p>
                )}
                kg
            </div>
            <div>
                *Peso max: 
                <input // SI o SI
                type="text"
                placeholder='Peso max' 
                value={newBreed.max_weight}
                name= "max_weight"
                onChange={onInputChange}/>
                {errors.max_weight && (
                    <p style={{color:"red"}}>{errors.max_weight}</p>
                )}
                kg
            </div>
            <div> Años de vida:
                <input 
                type="text"
                placeholder='AñosDeVida'
                value={newBreed.life_span}
                name="life_span"
                onChange={onInputChange}/>
                {errors.life_span && (
                    <p style={{color:"red"}}>{errors.life_span}</p>
                )} 
            </div>
            <div> Imagen:
                <input 
                type="text" 
                placeholder='Imagen'
                value={newBreed.image}
                name="image"
                onChange={onInputChange}/>
                {errors.image && (
                    <p style={{color:"red"}}>{errors.image}</p>
                )} 
            </div>
            <div>
                <select name="temperament" id="" onChange={onSelectChange}>
                    <option value="">Selecciona los temperamentos</option>
                    {temperaments.map(e => { 
                        return <option key={e.id} value={`${e.id},${e.name}`}>{e.name}</option>
                    })}
                </select>
                {temperamentName.name.map(el => { 
                   return <h5 key={el}>{" -" + el} <button value={el} onClick={removeTemperamentButton}>X</button></h5>
                })}
            </div>
            {Object.keys(errors).length === 0 &&  newBreed.name !== "" && newBreed.min_height !== "" && newBreed.max_height !== "" && newBreed.min_weight !== "" && newBreed.max_weight !== ""
            ? <button type='submit'>Crear nueva raza</button> 
            : <p style={{color:"red"}}>Completar los campos obligatorios * para crear su raza</p>}
        </form>
    </div>

  )
}


/* 
Ruta de creación de raza de perro: debe contener

[ ] Un formulario controlado con JavaScript con los siguientes campos:
Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida
[ ] Posibilidad de seleccionar/agregar uno o más temperamentos
[ ] Botón/Opción para crear una nueva raza de perro
Es requisito que el formulario de creación esté validado con JavaScript y no sólo con validaciones HTML. Pueden agregar las validaciones que consideren. Por ejemplo: Que el nombre de la raza no pueda contener números o símbolos, que el peso/altura mínimo no pueda ser mayor al máximo y viceversa, etc.
*/
