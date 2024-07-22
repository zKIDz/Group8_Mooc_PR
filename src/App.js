
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import  Detail  from './Pages/Detail';
import HomePage from './Pages/HomePage';
import Carts from './Pages/Carts';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/product/:id' element={<Detail/>}/>
      <Route path='/cart' element={<Carts/>}/>
      <Route path="/login" element={<LoginPage />} /> {/* New route for Login */}
      <Route path='/signup' element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
