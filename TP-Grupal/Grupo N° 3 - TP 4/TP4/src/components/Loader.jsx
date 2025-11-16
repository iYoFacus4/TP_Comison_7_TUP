// Loader.jsx — spinner centrado reutilizable
import { Spinner } from "react-bootstrap";

export default function Loader({ label = "Cargando..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" role="status" />
      <small className="text-muted mt-2">{label}</small>
    </div>
  );
}
