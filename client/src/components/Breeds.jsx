//rfc para crear componente

import React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllBreeds} from "../store/actions/index"; //importo mi action creator para poder ejecutarlo al hacer click o lo que quiera
import Pagination from "./Pagination";
import BreedCard from "./BreedCard";

export default function Breeds(){
    const dispatch = useDispatch(); // con el useDispatch transformo la funcion action creator en dispatcher para que se pueda conectar al reducer
    const breeds = useSelector(state => state.breeds); //useSelector recibe una funcion con el state y luego yo puedo retornar el pedazo de estado que quiero y asignarselo a una variable.
    //console.log(breeds)

    // Get current breed
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [breedsPerPage, setBreedsPerPage] = useState(8);

    //Change page
    function paginate(pageNumber){
        setCurrentPage(pageNumber)
    } 

    
    useEffect(() => { // al montarse se ejecuta getAllBreeds()
        setLoading(true);
        dispatch(getAllBreeds())
        setLoading(false);
    }, [dispatch]) 

    const indexOfLastBreed = currentPage * breedsPerPage; // var = 1 *8 = 8
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage; // var = 8 - 8 = 0
    const currentBreeds = breeds.slice(indexOfFirstBreed, indexOfLastBreed); // 150 slice(inicio 0, final 8)

    return(
        <div>
            {currentBreeds && currentBreeds.map(breed => {
                // if(e.id.length > 8){
                    return(
                        <BreedCard key={breed.id} 
                        name={breed.name} 
                        image={breed.image} 
                        temperament={breed.temperament} 
                        weight={breed.weight}
                        loading={loading}
                        />
                    )
            })}
            <Pagination 
            breedsPerPage={breedsPerPage} 
            totalBreeds={breeds.length} 
            paginate={paginate}
            />
        </div>
    )
}

// con useSelector le digo que en la variable breeds se aloje lo que esta en mi estado global state.breeds, que luego de el useEffect, o sea al montarse, se va a cargar gracias a mi dispatch(getAllBreeds()) con todas las razas, ya que mi funcion getAllBreeds() retorna una funcion con el dispatch, esto lo toma el thunk middleware que me permite hacer mi promesa asincrona con axios y lo que me devuelve mi promesa lo despatcho con una action con, con un type adecuado y un payload con la resolucion de la promesa a mi reducer. Finalmente mi reducer se encarga de actualizar mi estado global y mis componentes que lo consumen a traves por ejemplo de un useSelector se ven modificados al este modificarse



    // Lo que se use en varios componentes usar estado global, lo que se use en uno solo, estado local.