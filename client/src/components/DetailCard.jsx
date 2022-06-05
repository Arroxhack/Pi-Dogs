import React from 'react'
import { NavLink } from 'react-router-dom'

export default function DetailCard({dogId}) {
  return (
    <div>
      <NavLink exact to="/home">
        <button>Home</button>
      </NavLink>
      <h3>{dogId.name}</h3>
      <img src={dogId.image} alt= {`Raza Creada ${dogId.name}`} width="100px" /> {/* ACORDATE DE SACAR EL WIDTH */}
      <h4>{dogId.temperament ? `Temperamento: ${dogId.temperament}` : `No tiene temperamento`}</h4>
      <h4>{dogId.min_weight === null ? `Peso min: desconocido` : `Peso min: ${dogId.min_weight} kg`}</h4>
      <h4>{dogId.max_weight === null ? `Peso max: desconocido` : `Peso max: ${dogId.max_weight} kg`}</h4>
      <h4>{dogId.min_height === null ? `Altura min: desconocida` : `Altura min: ${dogId.min_height} cm`}</h4>
      <h4>{dogId.max_height === null ? `Altura max: desconocida` : `Altura max: ${dogId.max_height} cm`}</h4>
      <h4>{dogId.min_life_span === null || dogId.min_life_span === false ? `Años de vida min: desconocidos` : `Años de vida min: ${dogId.min_life_span}`}</h4>
      <h4>{dogId.max_life_span === null || dogId.max_life_span === false ? `Años de vida max: desconocidos` : `Años de vida max: ${dogId.max_life_span}`}</h4>
    </div>
  )
}

