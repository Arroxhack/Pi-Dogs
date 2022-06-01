import {GET_BREEDS, SORT, GET_TEMPERAMENTS, FILTER_TEMPERAMENT, FILTER_DB_OR_API_BREED} from "../actions"


const initialState = {
    breeds: [],
    temperaments: [],
    noModificationBreeds: [],
    filteredBreeds: [],
    filteredTemperaments: [],
}

export default function reducer(state=initialState, action){ // action = {type, payload}
    switch(action.type){
        case GET_BREEDS: 
            return{
                ...state,
                breeds: action.payload,
                noModificationBreeds: action.payload,
                filteredBreeds: action.payload
            }


        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload,
                filteredTemperaments: action.payload
            }


        case FILTER_TEMPERAMENT: //payload: "Stubborn" 
            if(action.payload === ""){
                return {
                    ...state,
                    breeds: state.noModificationBreeds
                }
            }
            let filteredBreedsTemperament = [...state.breeds]
            filteredBreedsTemperament = filteredBreedsTemperament.filter(e => e.temperament.includes(action.payload)); 
            return{
                ...state,
                breeds: filteredBreedsTemperament
            }


        case FILTER_DB_OR_API_BREED: // payload: "Affenpinscher"
            if(action.payload === ""){
                return {
                    ...state,
                    breeds: state.noModificationBreeds
                }
             }
            let filteredBreedsDbApi = [...state.breeds]
            filteredBreedsDbApi = filteredBreedsDbApi.filter(e => e.name.includes(action.payload))
            return{
                ...state,
                breeds: filteredBreedsDbApi
            }


        case SORT:  //payload: "ascendente"
            let orderedBreeds = [...state.breeds]
            orderedBreeds = orderedBreeds.sort((a, b) => {
                if(action.payload === "ascendente" || action.payload === "descendente"){
                    if(a.name > b.name){
                        return action.payload === "ascendente" ? 1 : -1; // por payload le paso el valor ascendete y descendente
                    }
                    if(a.name < b.name){
                        return action.payload === "ascendente" ? -1 : 1;
                    }
                }
                if(action.payload === "minWeight"){
                    if(a.min_weight > b.min_weight){
                        return 1; 
                    }
                    if(a.min_weight < b.min_weight){
                        return -1;
                    }
                }
                if(action.payload === "maxWeight"){
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


