import axios from "axios";


export const GET_BREEDS = "GET_BREEDS";
export const SORT = "SORT";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const FILTER_DB_OR_API_BREED = "FILTER_DB_OR_API_BREED";
export const SEARCH_BREED_NAME = "SEARCH_BREED_NAME";
export const POST_NEW_BREED = "POST_NEW_BREED";

const PATH = "http://localhost:3001"


export function getAllBreeds(){
    return async function(dispatch){
        try{
            let breeds = await axios.get(`${PATH}/dogs`)
            let breedsData = breeds.data
            return dispatch({
                type: GET_BREEDS,
                payload: breedsData
            })
        } 
        catch(error){
            console.log(error)
        }
    }
}


export function getAllTemperaments(){
    return async function(dispatch){
        try{
            let temperaments = await axios.get(`${PATH}/temperament`)
            let temperamentsData = temperaments.data
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperamentsData
            })
        } 
        catch(error){
            console.log(error)
        }
    }
}

export function searchBreedName(name){
    return async function (dispatch){
        try {
            let breed = await axios.get(`${PATH}/dogs?name=${name}`)
            let breedData = breed.data
            return dispatch({
                type: SEARCH_BREED_NAME,
                payload: breedData
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function sort(order){
    return {
        type: SORT,
        payload: order
    }
}

export function filterTemperament(temperament){
    return {
        type: FILTER_TEMPERAMENT,
        payload: temperament // "Stubborn"
    }
}

export function filterDbOrApiBreeds(name){
    return {
        type: FILTER_DB_OR_API_BREED,
        payload: name // "Affenpinscher"
    }
}

export function postNewBreed(newBreed){
    return async function (dispatch){
        try {
            let newBreedCreated = await axios.post(`${PATH}/dog`, newBreed)
            let newBreedCreatedData = newBreedCreated.data
            return newBreedCreatedData
        } 
        catch (error) {
            console.log(error)
        }
    }
}






