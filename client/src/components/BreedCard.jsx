import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BreedCard({ id, name, image, temperament, min_weight, max_weight}){
    return(
        <NavLink exact to={`/breedDetail/${id}`} >
            <div>   
                <h3>{name}</h3>
                <img src={image} alt= {`Raza Creada ${name}`} width="100px" /> {/* ACORDATE DE SACAR EL WIDTH */}
                <h4>{temperament}</h4>
                <h4>{min_weight === 0 ? `Peso min: desconocido` : `Peso min: ${min_weight} kg`}</h4>
                <h4>{max_weight === 0 ? `Peso max: desconocido` : `Peso max: ${max_weight} kg`}</h4>
            </div>
        </NavLink>
    ) 
}
