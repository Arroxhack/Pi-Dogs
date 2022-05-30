import React from 'react';
import { useState } from 'react' ;
import axios from 'axios';
import BreedCard from "./BreedCard";

export default function SearchBar() {
    const [search, setSearch] = useState("")
    const [breed, setBreed] = useState([])

    let onSubmit = async(e) => {
        e.preventDefault(); // muy importante
        if(search){
          const response = await axios.get(`http://localhost:3001/dogs?name=${search}`)
          setBreed(response.data)
          console.log(response.data)
        }
        //dispatch(getDogBreed(search));
        setSearch("");
    }
    
    let onInputChange = (e) => { // seteo mi estado a lo que el usuario tipea
        setSearch(e.target.value)
    }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input  
        type="text"  
        onChange={onInputChange} 
        placeholder='Ingrese una raza de perro'
        value = {search}
        />
        <input 
        type="submit" 
        value="Buscar" 
        onSubmit={onSubmit}
        />
        {typeof breed !== "string" 
          ? breed.map(e => {
            return (<BreedCard key={e.id} 
              name={e.name} 
              image={e.image} 
              temperament={e.temperament} 
              weight={e.weight}/>)
          })
          : <div><h2>{breed}</h2></div>}
      </form> 
    </div>
  )
}
