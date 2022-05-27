import axios from "axios";

export function getAllBreeds(){ // action creators
    return (dispatch) => { // se retorna una funcion con dispatch como argumento
        return axios("http://localhost:3001/dogs")
            .then(res => res.data)
            .then(resData => dispatch({type:"GET_BREEDS", payload: resData}))
    }
} 