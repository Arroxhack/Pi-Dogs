import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailCard from './DetailCard';

export default function BreedDetail(){

    const {id} = useParams();
    const [dogId, setDogId] = useState(null);

    // useEffect(async() => { // al montarse se ejecuta getAllBreeds()
    //     const response = await axios.get(`http://localhost:3001/dogs/${id}`)
    //     setDogId(response.data)
    // },[])

    useEffect(() => { // al montarse se ejecuta getAllBreeds()
        const axiosData = async() => {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`)
        setDogId(response.data)
    }
    axiosData()
    .catch(e => console.log(e))
    },[id])

    return(
        <div>
            {dogId ? <DetailCard dogId={dogId[0]}/> : <h1>Loading...</h1> }
        </div>
    ) 
}

/* 
height: "23 - 29"
id: 1
image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
life_span: "10 - 12 years"
max_weight: 6
min_weight: 3
name: "Affenpinscher"
temperament: "Stubborn, Curious, Playful
*/


/* 
Ruta de detalle de raza de perro: debe contener

[ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida
*/
