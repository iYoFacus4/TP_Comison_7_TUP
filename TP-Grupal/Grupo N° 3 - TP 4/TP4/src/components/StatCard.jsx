import React from "react";
import { Card } from "react-bootstrap";

/** StatCard: tarjeta de métrica con icono React (Lucide) */
export default function StatCard({ title, value, icon, color = "dark", link }) {
  const onClick = () => {
    if (link) window.open(link, "_blank", "noopener,noreferrer");
  };
  return (
    <Card
      className="shadow-sm h-100 border-0 stat-card"
      style={{ transition: "0.3s", cursor: link ? "pointer" : "default" }}
      onClick={onClick}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <div className="text-muted small">{title}</div>
          <div className={`fs-3 fw-bold text-${color}`}>
            {value}
          </div>
        </div>
        {icon && <div className="fs-2 stat-icon">{icon}</div>}
      </Card.Body>
    </Card>
  );
}
