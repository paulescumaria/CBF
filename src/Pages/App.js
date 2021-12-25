import React, {useState} from 'react';
import '../Styles/App.css';
import Login from '../Pages/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import Recipes from './Recipes';


function App() {
  const [appManager, setAppManager] = useState(false)
  
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login stateManager={setAppManager} />}>  </Route> 
            <Route path="/home" element={ <Home manager={appManager} stateManager={setAppManager}/> }>  </Route> 
            <Route path="/recipes" element={ <Recipes manager={appManager} stateManager={setAppManager}/> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
