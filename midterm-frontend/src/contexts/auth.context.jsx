import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const temp = localStorage.getItem("user");
    return temp ? JSON.parse(temp) : null; 
  });

  const login = (newUser) => {
    setUser(newUser);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); 
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);