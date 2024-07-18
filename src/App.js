
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import  Detail  from './Pages/Detail';
import HomePage from './Pages/HomePage';
import Carts from './Pages/Carts';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/product/:id' element={<Detail/>}/>
      <Route path='/cart' element={<Carts/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
