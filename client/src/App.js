import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import {  Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreateRecipe from './components/createRecipe/CreateRecipe';
function App() {
    return (
        <div className="App">
            
                <Route exact path={'/'} component={LandingPage} />
                <Route exact path={'/home'} component={Home} />
                <Route exact path={'/detail/:id'} component={Detail} />
                <Route exact path={'/create'} component={CreateRecipe} />
            
        </div>
    );
}

export default App;