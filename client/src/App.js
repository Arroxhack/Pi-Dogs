import './App.css';
import {Route} from "react-router-dom"
import Home from './components/Home';
// import Breeds from './components/Breeds';
// import SearchBar from './components/SearchBar';
import LandingPage from './components/LandingPage';
import BreedDetail from './components/BreedDetail';

function App() {
  return (
    <div className="App">

      <Route exact path="/">
        <LandingPage/>
      </Route>

      <Route exact path="/home">
        <Home/>
        {/* <SearchBar/>
        <Breeds/> */}
      </Route> 
      
      <Route exact path="/breed/:id">
        <BreedDetail/>
      </Route>
    </div>
  );
}

export default App;
