import {GET_BREEDS, SORT, GET_TEMPERAMENTS, FILTER_TEMPERAMENT, FILTER_DB_OR_API_BREED, SEARCH_BREED_NAME, POST_NEW_BREED} from "../actions";


const initialState = {
    breeds: [],
    temperaments: [],
    noModificationBreeds: [],
}

export default function reducer(state=initialState, action){ 
    switch(action.type){

        case GET_BREEDS: 
            return{
                ...state,
                breeds: action.payload,
                noModificationBreeds: action.payload
            }

        case SEARCH_BREED_NAME:
            return{
                ...state,
                breeds: action.payload    
            }
            
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            }

        case POST_NEW_BREED:
            return{
                ...state    
            }


        case FILTER_TEMPERAMENT: //payload: "Stubborn" 
            let allBreeds = state.noModificationBreeds
            let filteredBreedsTemperament = action.payload === "" ? allBreeds : allBreeds.filter(e => e.temperament.includes(action.payload)); 
            return{
                ...state,
                breeds: filteredBreedsTemperament
            }


        case FILTER_DB_OR_API_BREED: // payload: "Api"
            if(action.payload === ""){
                return {
                    ...state,
                    breeds: state.noModificationBreeds
                }
             }
                let allBreeds2 = state.noModificationBreeds
                let filteredBreedsDbApi = action.payload === "Api" ? allBreeds2.filter(e => typeof e.id === "number") : allBreeds2.filter(e => typeof e.id === "string")
                console.log(filteredBreedsDbApi)
                return{
                    ...state,
                    breeds: filteredBreedsDbApi.length > 0 ? filteredBreedsDbApi : [{error: "No created breeds yet"}]
                }

        case SORT:  //payload: "ascendente"
            let orderedBreeds = [...state.breeds]
            orderedBreeds = orderedBreeds.sort((a, b) => {
                if(action.payload === "ascendente" || action.payload === "descendente"){
                    if(a.name > b.name){
                        return action.payload === "ascendente" ? 1 : -1; 
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


