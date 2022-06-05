import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { filterTemperament, filterDbOrApiBreeds } from '../store/actions';

export default function Filter() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);

    function onSelectTemperament(e){
        dispatch(filterTemperament(e.target.value))
    }

    function onSelectDbOrApiBreed(e){
        dispatch(filterDbOrApiBreeds(e.target.value))
    }

    return (
        <div>
            <select name="select" onChange={onSelectTemperament}>
                <option value="">Todos los temperamentos</option>
                {temperaments.map(e => {
                    return <option key={e.id} value={e.name}>{e.name}</option>
                })}
            </select>
            <select name="select" onChange={onSelectDbOrApiBreed}>
                <option value="">Todos los perros</option>
                <option value="Api">Api</option>
                <option value="Db">Db</option>
            </select>
      </div>
    )
}


/* 
[ ] Botones/Opciones para filtrar por:
Temperamento
Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
*/
