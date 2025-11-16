// EmptyState.jsx — estado vacío con icono Lucide opcional
import { Card } from "react-bootstrap";

export default function EmptyState({ title = "Sin datos", desc = "No hay información para mostrar.", icon = null, action = null }) {
  return (
    <Card className="shadow-sm text-center p-4">
      <div className="d-flex flex-column align-items-center gap-2">
        {icon && <div className="text-muted">{icon}</div>}
        <h5 className="mb-0">{title}</h5>
        <p className="text-muted mb-1">{desc}</p>
        {action /* botón opcional */}
      </div>
    </Card>
  );
}
