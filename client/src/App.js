import './App.css';
import {Route} from "react-router-dom"
import Home from './components/Home';
import Breeds from './components/Breeds';
import SearchBar from './components/SearchBar';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">

      <Route exact path="/">
        <LandingPage/>
      </Route>

      <Route exact path="/home">
        <SearchBar/>
        <Breeds/>
      </Route> 
      
      <Route>
        
      </Route>
    </div>
  );
}

export default App;
