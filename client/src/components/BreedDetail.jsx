import React, { useState } from 'react'

export default function BreedDetail({loading, name, image, temperament, min_weight, max_weight, min_height, max_height,life_span}){
    const [breedId, setBreedId] = useState(null)
    if(loading){
        return(
            <h2>Loading...</h2>
        )    
    }
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt= {`Raza Creada ${name}`} />
            <h4>{temperament}</h4>
            <h4>{min_weight === 0 ? `Peso min: desconocido` : `Peso min: ${min_weight} kg`}</h4>
            <h4>{max_weight === 0 ? `Peso max: desconocido` : `Peso max: ${max_weight} kg`}</h4>
        </div>
    ) 
}
