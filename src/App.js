import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './Contexts/AuthContext';
import Detail from './Pages/Detail';
import HomePage from './Pages/HomePage';
import Carts from './Pages/Carts';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import AdminPage from './Pages/AdminPage';
import Profile from './Pages/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import VerifyOrder from './Pages/VerifyOrder';
import SearchResult from './Pages/SearchResult';
import WishlistPage from './Pages/WishlistPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryid" element={<HomePage />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/verify-order" element={<VerifyOrder />} />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/pro" element={<ProtectedRoute component={Profile} allowedRoles={['user']} />} />
          <Route path="/admin" element={<ProtectedRoute component={AdminPage} allowedRoles={['admin']} />} />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
