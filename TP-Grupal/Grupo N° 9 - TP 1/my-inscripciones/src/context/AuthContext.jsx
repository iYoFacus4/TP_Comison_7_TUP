import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  });

  const login = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setUsuario(data);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUsuario(null);
  };

  // Sincroniza cambios entre pestañas
  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem("auth");
      setUsuario(data ? JSON.parse(data) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
