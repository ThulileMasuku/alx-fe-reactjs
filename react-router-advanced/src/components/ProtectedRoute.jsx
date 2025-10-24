import React, { useState, createContext, useContext } from 'react';
import { Navigate } from 'react-router-dom';

// 🔑 Create a simple Authentication Context
const AuthContext = createContext(null);

// 🔒 Authentication Provider: Simulates login/logout state
export const AuthProvider = ({ children }) => {
  // 💡 State for Authentication Status
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🎣 Hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// 🛡️ Protected Route Component: Checks auth status before rendering child routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // ➡️ Redirect unauthenticated users to the home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;