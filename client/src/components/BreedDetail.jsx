import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailCard from './DetailCard';

export default function BreedDetail(){

    const {id} = useParams();
    const [dogId, setDogId] = useState(null);


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


