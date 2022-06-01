import reducer from "./reducer";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"; // este es un middleware // Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object.
import {composeWithDevTools} from "redux-devtools-extension"; //libreria que importo que tiene un metodo para activar las devtools sin chorizo

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)) // CHEQUEAR XD // composeWithDevTools el metodo, activa las devtools y le pasa el store para poder verlo en el navegador con la extension redux devtools
)

export default store;