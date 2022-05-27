const initialState = {
    breeds: [],
    temperaments: [],
}

function reducer(state=initialState, {type, payload}){ // action = {type, payload}
    switch(type){
        case "GET_BREEDS": 
            return{
                ...state,
                breeds: payload
            }
        default: 
            return state
    }
}

export default reducer;
