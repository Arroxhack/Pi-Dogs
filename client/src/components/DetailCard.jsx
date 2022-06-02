import React from 'react'

export default function DetailCard({dogId}) {
  return (
    <div>
    <h3>{dogId.name}</h3>
    <img src={dogId.image} alt= {`Raza Creada ${dogId.name}`} width="100px" />
    <h4>{dogId.temperament}</h4>
    {/* <h4>{min_weight === 0 ? `Peso min: desconocido` : `Peso min: ${min_weight} kg`}</h4>
    <h4>{max_weight === 0 ? `Peso max: desconocido` : `Peso max: ${max_weight} kg`}</h4> */}
    <h4>{dogId.height}</h4>
    <h4>{dogId.life_span}</h4> 
</div>
  )
}

