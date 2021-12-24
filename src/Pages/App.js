import '../Styles/App.css';
import Login from '../Pages/Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import Recipes from './Recipes';


function App() {

  
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}>  </Route> 
            <Route path="/home" element={ <Home /> }>  </Route> 
            <Route path="/recipes" element={ <Recipes /> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
