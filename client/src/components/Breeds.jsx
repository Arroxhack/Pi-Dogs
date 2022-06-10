import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllBreeds, getAllTemperaments} from "../store/actions/index"; 
import Pagination from "./Pagination";
import BreedCard from "./BreedCard";
import Order from "./Order";
import Filter from "./Filter";
import styles from "./CSS/Breeds.module.css";

export default function Breeds(){

    const dispatch = useDispatch(); 

    const breeds = useSelector(state => state.breeds); 
    

    // Get current breed
    const [currentPage, setCurrentPage] = useState(1);
    const [breedsPerPage] = useState(8);
    const indexOfLastBreed = currentPage * breedsPerPage; // var = 1 *8 = 8 // 3 * 8 = 24
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage; // var = 8 - 8 = 0 // 24 - 8 = 16
    const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed); // 175 slice(inicio 0, final 8) // del 16 al 24


    //Change page
    function paginate(pageNumber){
        setCurrentPage(pageNumber)
    } 

    useEffect(() => { 
        dispatch(getAllBreeds())
        dispatch(getAllTemperaments())
    }, [dispatch]) 

    if(currentBreeds.length === 0) {return(<h1>Loading...</h1>)}
    return(
        <div className={styles.bodyDiv}> 
            <div className={styles.orderFilterDiv}>
                <Order/>
                <Filter breeds={breeds}/>
            </div>
            <div className={styles.cardsDivContainer}>
                {currentBreeds[0].error ? <h4>{currentBreeds[0].error}</h4> 
                : currentBreeds.map(breed => {
                        return(
                                <BreedCard key={breed.id}
                                id={breed.id} 
                                name={breed.name} 
                                image={breed.image} 
                                temperament={breed.temperament}
                                min_weight={breed.min_weight ? breed.min_weight : 0} 
                                max_weight={breed.max_weight ? breed.max_weight : 0}
                                />
                        )
                })}
            </div>
                <Pagination 
                breedsPerPage={breedsPerPage} 
                totalBreeds={breeds.length} 
                paginate={paginate} 
                />
        </div>
    )
}


