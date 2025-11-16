import { Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div
      className="d-flex flex-column justify-content-between p-3"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d6efd 0%, #0b5ed7 100%)",
        color: "#fff",
      }}
    >
      {/* Parte superior: navegación */}
      <div>
        <h4 className="mb-4 text-center fw-bold text-white">GESTIÓN</h4>
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/SeccionDonaciones"
            className="text-white py-2 px-3 rounded mb-2"
            style={{ transition: "all 0.2s" }}
          >
            <i className="bi bi-gift me-2"></i> Sección Donaciones
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/Donantes"
            className="text-white py-2 px-3 rounded mb-2"
            style={{ transition: "all 0.2s" }}
          >
            <i className="bi bi-people-fill me-2"></i> Donantes
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/Entregas"
            className="text-white py-2 px-3 rounded mb-2"
            style={{ transition: "all 0.2s" }}
          >
            <i className="bi bi-truck me-2"></i> Entregas
          </Nav.Link>
        </Nav>
      </div>

      {/* Parte inferior: cerrar sesión */}
      <div className="text-center mt-auto">
        <Button
          variant="light"
          size="sm"
          className="w-100 mb-2 fw-bold"
          onClick={handleLogout}
          style={{ transition: "all 0.2s" }}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar sesión
        </Button>
        <p className="text-white-50 small mb-0">
          Sesión iniciada como: <strong>{JSON.parse(localStorage.getItem("user"))?.name}</strong>
        </p>
      </div>
    </div>
  );
}
