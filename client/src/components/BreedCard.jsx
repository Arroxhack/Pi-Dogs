import React from 'react'

export default function BreedCard({loading, name, image, temperament, weight}){
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
            <h4>{weight}</h4>
        </div>
    ) 
}
