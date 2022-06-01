import React from 'react'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllBreeds } from '../store/actions';
import { filterTemperament, filterDbOrApiBreeds } from '../store/actions';

export default function Filter() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const breeds = useSelector(state => state.noModificationBreeds);
    // const filteredBreeds = useSelector(state => state.filteredBreeds);
    // const filteredTemperaments = useSelector(state => state.filteredTemperaments);

    // useEffect(() => { // al montarse se ejecuta getAllBreeds()
    //     dispatch(getAllTemperaments())
    // }, [dispatch]) // chequear modificar esto por temperaments

    // console.log(temperaments)
    // console.log(breeds)
    // breeds.map(e => {
    //     console.log(e.temperaments)
    // })

    function onSelectTemperament(e){
        // if(e.target.value === ""){
        //     return dispatch(getAllBreeds())
        // }
        dispatch(filterTemperament(e.target.value))
    }

    function onSelectDbOrApiBreed(e){
        // if(e.target.value === ""){
        //     return dispatch(getAllBreeds())
        // }
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
                <option value="">Db y Api</option>
                {breeds.map(e => {
                    return <option key={e.id} value={e.name}>{e.name}</option>
                })}
            </select>
      </div>
    )
}


/* 
[ ] Botones/Opciones para filtrar por:
Temperamento
Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
*/
