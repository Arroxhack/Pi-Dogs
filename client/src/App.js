import './App.css';
import {Route} from "react-router-dom"
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import BreedDetail from './components/BreedDetail';
import Form from './components/Form';

function App() {
  return ( 
    <div className="App">

      <Route exact path="/">
        <LandingPage/>
      </Route>

      <Route exact path="/home">
        <Home/>
      </Route> 

      <Route exact path="/home/createDog">
        <Form/>
      </Route>
      
      <Route exact path="/breedDetail/:id">
        <BreedDetail/>
      </Route>
    </div>
  );
}

export default App;
