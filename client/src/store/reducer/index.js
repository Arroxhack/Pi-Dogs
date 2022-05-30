import {GET_BREEDS} from "../actions"

const initialState = {
    breeds: [],
    filteredBreeds: [],
    temperaments: [],
}

export default function reducer(state=initialState, action){ // action = {type, payload}
    switch(action.type){
        case GET_BREEDS: 
            return{
                ...state,
                breeds: action.payload
            }
        default: 
            return state
    }
}


