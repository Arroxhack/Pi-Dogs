import React, {useState, useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import { postNewBreed, getAllTemperaments } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';




export default function Form() {

const [temperamentName, setTemperamentName] = useState({
    name: []
})

const [newBreed, setNewBreed] = useState({
    name: "",
    min_height: 1,
    max_height: 1,
    min_weight: 1,
    max_weight: 1,
    life_span: 1,
    temperament: [],
    image: ""
});

const dispatch = useDispatch()
const temperaments = useSelector(state => state.temperaments)

useEffect(() => {
    dispatch(getAllTemperaments())
}, [dispatch])

let onInputChange = (e) => {
    setNewBreed({
        ...newBreed,
        [e.target.name]: e.target.value // el e.target.name corresponde con la propiedad del estado en cada caso.
    })
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
        min_height: 0,
        max_height: 0,
        min_weight: 0,
        max_weight: 0,
        life_span: 0,
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
            <div> Raza:
                <input  // SI o SI
                type="text" 
                placeholder='Raza'
                value={newBreed.name}
                name= "name"
                onChange={onInputChange}/> 
            </div>
            <div> Altura min:
                <input // SI o SI
                type="number"
                placeholder='Altura min' 
                value={newBreed.min_height}
                name= "min_height"
                onChange={onInputChange}/> 
                Altura max:
                <input // SI o SI
                type="number"
                placeholder='Altura max' 
                value={newBreed.max_height}
                name= "max_height"
                onChange={onInputChange}/>
            </div>
            <div> Peso min:
                <input // SI o SI
                type="number"
                placeholder='Peso min' 
                value={newBreed.min_weight}
                name= "min_weight"
                onChange={onInputChange}/>
                Peso max: 
                <input // SI o SI
                type="number"
                placeholder='Peso max' 
                value={newBreed.max_weight}
                name= "max_weight"
                onChange={onInputChange}/>
            </div>
            <div> Años de vida:
                <input 
                type="number"
                placeholder='AñosDeVida'
                value={newBreed.life_span}
                name="life_span"
                onChange={onInputChange}/> 
            </div>
            <div> Imagen:
                <input 
                type="text" 
                placeholder='Imagen'
                value={newBreed.image}
                name="image"
                onChange={onInputChange}/>
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
            <button type='submit'>Crear nueva raza</button>
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
