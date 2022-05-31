import React from 'react';
import { useState, useEffect } from 'react' ;
import axios from 'axios';
import BreedCard from "./BreedCard";


export default function SearchBar() {
    const [search, setSearch] = useState("")
    const [breed, setBreed] = useState([])

    useEffect(() => { // al montarse se ejecuta getAllBreeds()
      (async() => {
        if(search === ""){
          setBreed("")
        }
        if(search){
          const response = await axios.get(`http://localhost:3001/dogs?name=${search}`)
          setBreed(response.data)
          console.log(response.data)
        }
      })()
  }, [search]) 

    let onInputChange = async(e) => { // seteo mi estado a lo que el usuario tipea
        setSearch(e.target.value)
    }

  return (
    <div>
        <input  
        type="text"  
        onChange={onInputChange} 
        placeholder='Ingrese una raza de perro'
        value = {search}
        />
        {typeof breed !== "string" 
          ? breed.map(e => {
            return (<BreedCard key={e.id} 
              name={e.name} 
              image={e.image} 
              temperament={e.temperament} 
              min_weight={e.min_weight ? e.min_weight : 0} 
              max_weight={e.max_weight ? e.max_weight: 0}
              />)
          })
          : <div><h2>{breed}</h2></div>}
    </div>
  )
}
