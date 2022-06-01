import axios from "axios";


export const GET_BREEDS = "GET_BREEDS";
export const SORT = "SORT";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const FILTER_DB_OR_API_BREED = "FILTER_DB_OR_API_BREED";

const PATH = "http://localhost:3001"

// export function getAllBreeds(){ // action creators
//     return function(dispatch){ // se retorna una funcion con dispatch como argumento
//         return axios.get(`${PATH}/dogs`)
//             .then(breeds => breeds.data)
//             .then(breedsData => dispatch({
//                 type: GET_BREEDS,
//                  payload: breedsData
//             }))
//             .catch((error) => {
//                 console.log(error) // si no puedo despatchar una action con type por ej ERROR_GET_BREEDS que genere un componente por unos segundos
//             })
//     }
// } 

export function getAllBreeds(){
    try{
        return async function(dispatch){
            let breeds = await axios.get(`${PATH}/dogs`)
            let breedsData = breeds.data
            return dispatch({
                type: GET_BREEDS,
                payload: breedsData
            })
        } 
    }catch(error){
        console.log(error)
    }
}


export function getAllTemperaments(){
    try{
        return async function(dispatch){
            let temperaments = await axios.get(`${PATH}/temperament`)
            let temperamentsData = temperaments.data
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperamentsData
            })
        } 
    }catch(error){
        console.log(error)
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

export function searchBreed(){

}

// export function getDogBreed(breed){
//     return function (dispatch){ // se retorna una funcion con dispatch como argumento
//         return axios.get(`${PATH}/dogs`)
//             .then(breeds => breeds.data)
//             .then(breedsData => dispatch({
//                 type: GET_BREEDS,
//                  payload: breedsData
//             }))
//             .catch((error) => {
//                 console.log(error) // si no puedo despatchar una action con type por ej ERROR_GET_BREEDS que genere un componente por unos segundos
//             })
//     }
// }



