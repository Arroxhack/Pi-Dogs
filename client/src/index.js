import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"; 
import store from "./store"; 
import {Provider} from "react-redux";  
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"
/* se le setea a axios en su propiedad default la propiedad baseURL */
/* Pregunto si esta la variable de entorno REACT_APP_API, si no hay nada la defino manualmente en el codigo (la hardcodeo)  */


ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
