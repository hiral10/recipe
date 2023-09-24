import logo from './logo.svg';
import './App.css';
import Homepage from './component/homepage';
import Recipe from './component/recipe';
import { Route, Routes } from "react-router-dom";
export const config = {
  endpoint: `https://recipe-kcpn.onrender.com/v1`,
};
function App() {
  return (
    <div className="App">
       <Routes>
       <Route exact path='/' element={<Homepage/>}/>
       <Route exact path='/recipe/:recipeId' element={<Recipe/>}/>
      
       </Routes>
     
    </div>
  );
}

export default App;
