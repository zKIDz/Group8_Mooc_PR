import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './Contexts/AuthContext';
import Detail from './Pages/Detail';
import HomePage from './Pages/HomePage';
import Carts from './Pages/Carts';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import AdminPage from './Pages/AdminPage';
import Profile from './Pages/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import VerifyOrder from './Pages/VerifyOrder';
<<<<<<< HEAD
import SearchResult from './Pages/SearchResult';
=======
>>>>>>> 0daf3332199778653abf29b9ad37fec85b9fc5e9

import SearchResult from './Pages/SearchResult';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const role = localStorage.getItem('role');
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <>
    <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage /> } />
          <Route path="/category/:categoryid" element={<HomePage />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/verify-order" element={<VerifyOrder />} />
          <Route
          path="/login"
          element={isAuthenticated ? (
            role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/" />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        />
          {/* <Route path='/pro' element={<Profile/>}/> */}
          <Route path="/pro" element={<ProtectedRoute component={Profile} allowedRoles={['user']} />} />
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path="/search" element={<SearchResult />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/admin" element={<ProtectedRoute component={AdminPage} allowedRoles={['admin']} />} />
       <Route
          path="*"
          element={<Navigate to={isAuthenticated ? (role === 'admin' ? "/admin" : "/") : "/login"} />}
        />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

     

    </>
  );
}

export default App;
