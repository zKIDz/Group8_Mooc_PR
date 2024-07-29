import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const login = (userRole, userEmail) => {
    localStorage.setItem("token", "fake-jwt-token");
    localStorage.setItem("role", userRole);
    localStorage.setItem("email", userEmail);
    setIsAuthenticated(true);
    setRole(userRole);
    setEmail(userEmail); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setRole("");
    setEmail(""); 
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, email, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
