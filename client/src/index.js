import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // importo mi app
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"; // importo la posibilidad de rutear en mi app
import store from "./store"; // importo mi store
import {Provider} from "react-redux"; // importo mi provider que me permite que toda mi app este conectada al store y conozca de mi store para poder acceder desde cualquier lado

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
