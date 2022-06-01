import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Form() {

const [newBreed, setNewBreed] = useState("");
const [minHeight, setMinHeight] = useState(0);
const [maxHeight, setMaxHeight] = useState(0);
const [minWeight, setMinWeight] = useState(0);
const [maxWeight, setMaxWeight] = useState(0);
const [lifeSpan, setLifeSpan] = useState(0);

let submitDog = (e) => {
    e.preventDefault();
}



  return (
    <div>           
        <button>
            <NavLink exact to="/home">Home</NavLink>
        </button>
        <form onSubmit={submitDog}>
            <div>
                <input  // SI o SI
                type="text" 
                placeholder='Raza'/> 
            </div>
            <div>
                <input // SI o SI
                type="number"
                placeholder='Altura min' /> 
                <input // SI o SI
                type="number"
                placeholder='Altura max' />
            </div>
            <div>
                <input // SI o SI
                type="number"
                placeholder='Peso min' /> 
                <input // SI o SI
                type="number"
                placeholder='Peso max' />
            </div>
            <div>
                <input 
                type="number"
                placeholder='AñosDeVida' /> 
            </div>
            <div>
                <input type="submit" />
            </div>
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
