import axios from "axios";

export const GET_BREEDS = "GET_BREEDS";

const PATH = "http://localhost:3001"

export function getAllBreeds(){ // action creators
    return function (dispatch){ // se retorna una funcion con dispatch como argumento
        return axios.get(`${PATH}/dogs`)
            .then(breeds => breeds.data)
            .then(breedsData => dispatch({
                type: GET_BREEDS,
                 payload: breedsData
            }))
            .catch((error) => {
                console.log(error) // si no puedo despatchar una action con type por ej ERROR_GET_BREEDS que genere un componente por unos segundos
            })
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



