import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    
    const session = localStorage.getItem("isLogged");
    if (session === "true") setIsLogged(true);
  }, []);

  const handleLogin = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", "true");
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("isLogged");
  };

  return (
    <>
      {isLogged ? (
        <MainLayout onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
