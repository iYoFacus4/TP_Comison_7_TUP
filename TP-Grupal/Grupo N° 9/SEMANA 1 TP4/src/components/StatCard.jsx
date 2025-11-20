import React from "react";
import { Card } from "react-bootstrap";

export default function StatCard({ title, value, icon }){
  return (
    <Card className="shadow-sm stat-card glass h-100">
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <div className="text-muted small">{title}</div>
          <div className="fs-3 fw-bold">{value}</div>
        </div>
        <div className="stat-icon">{icon}</div>
      </Card.Body>
    </Card>
  );
}
