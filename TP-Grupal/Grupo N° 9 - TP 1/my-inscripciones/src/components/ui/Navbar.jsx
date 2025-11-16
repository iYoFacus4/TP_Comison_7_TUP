import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar bg-light shadow-sm px-4 d-flex justify-content-between align-items-center">
      <h5 className="m-0">Inscripciones - TP1</h5>

      <div>
        {usuario ? (
          <button onClick={handleLogout} className="btn btn-danger">
            Cerrar sesión
          </button>
        ) : (
          <button onClick={handleLogin} className="btn btn-primary">
            Iniciar sesión
          </button>
        )}
      </div>
    </nav>
  );
}
