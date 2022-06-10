import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetailCard from './DetailCard';
import styles from "./CSS/BreedDetail.module.css";
import { NavLink } from 'react-router-dom';

export default function BreedDetail(){

    const {id} = useParams();
    const [dogId, setDogId] = useState(null); 


    useEffect(() => { 
        const axiosData = async() => {
        const response = await axios.get(`http://localhost:3001/dogs/${id}`)
        setDogId(response.data)
    }
    axiosData()
    .catch(e => console.log(e))
    },[id])

    return(
        <div className={styles.body}>
            <button className={styles.homeButton}>
                <NavLink className={styles.navLink} exact to="/home">Home</NavLink>
            </button>
                {dogId ? <DetailCard dogId={dogId[0]}/> : <h1>Loading...</h1> }
        </div>
    ) 
}


