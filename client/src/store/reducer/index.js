import {GET_BREEDS, SORT} from "../actions"
import {ASCENDENTE, DESCENDENTE, MIN_WEIGHT, MAX_WEIGHT} from "../../constantes/sort"

const initialState = {
    breeds: [],
    temperaments: [],
}

export default function reducer(state=initialState, action){ // action = {type, payload}
    switch(action.type){
        case GET_BREEDS: 
            return{
                ...state,
                breeds: action.payload,
                filteredBreeds: action.payload
            }
        case SORT:  //payload: Ascendente
            let orderedBreeds = [...state.breeds]
            orderedBreeds = orderedBreeds.sort((a, b) => {
                if(action.payload === ASCENDENTE || action.payload === DESCENDENTE){
                    if(a.name > b.name){
                        return action.payload === ASCENDENTE ? 1 : -1; // por payload le paso el valor ascendete y descendente
                    }
                    if(a.name < b.name){
                        return action.payload === ASCENDENTE ? -1 : 1;
                    }
                }
                if(action.payload === MIN_WEIGHT){
                    if(a.min_weight > b.min_weight){
                        return 1; 
                    }
                    if(a.min_weight < b.min_weight){
                        return -1;
                    }
                }
                if(action.payload === MAX_WEIGHT){
                    if(a.max_weight > b.max_weight){
                        return -1; 
                    }
                    if(a.max_weight < b.max_weight){
                        return 1;
                    }
                }
                return 0;
            })
            return{
                ...state,
                breeds: orderedBreeds
            }
        default: 
            return state
    }
}


