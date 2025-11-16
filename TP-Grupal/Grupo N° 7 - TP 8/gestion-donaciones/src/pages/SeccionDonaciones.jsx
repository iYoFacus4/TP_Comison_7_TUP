import { useState, useEffect } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { FaDonate, FaClock, FaCheckCircle } from "react-icons/fa";

export default function SeccionDonaciones() {
  const [donaciones, setDonaciones] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, nombre: "Campaña Invierno", monto: 25000, fecha: "2025-10-10", estado: "Completada" },
      { id: 2, nombre: "Donación Escolar", monto: 12000, fecha: "2025-10-15", estado: "Pendiente" },
      { id: 3, nombre: "Ayuda Social", monto: 8000, fecha: "2025-10-20", estado: "Completada" },
      { id: 4, nombre: "Recolección Médica", monto: 15000, fecha: "2025-10-22", estado: "Pendiente" },
      { id: 5, nombre: "Fondo Ambiental", monto: 20000, fecha: "2025-09-30", estado: "Completada" },
      { id: 6, nombre: "Donación de Emergencia", monto: 5000, fecha: "2025-10-05", estado: "Pendiente" },
    ];
    setDonaciones(data);
  }, []);

  const getBgColor = (estado) => {
    if (estado === "Completada") return "bg-success text-white";
    if (estado === "Pendiente") return "bg-warning text-dark";
    return "bg-secondary text-white";
  };

  return (
    <div className="container mt-5">
<Card className="shadow-lg mb-4 p-3 text-center" style={{ borderRadius: '15px', backgroundColor: '#0d6efd', color: 'white' }}>
  <Card.Title className="fw-bold m-0">
    Sección Donaciones
  </Card.Title>
</Card>

      <Row xs={1} md={2} lg={3} className="g-4">
        {donaciones.map((don) => (
          <Col key={don.id}>
            <Card className={`shadow-lg ${getBgColor(don.estado)} border-0 h-100`} style={{ borderRadius: '15px', transition: 'transform 0.3s' }}>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold d-flex align-items-center gap-2">
                    <FaDonate /> {don.nombre}
                  </Card.Title>
                  <Card.Text className="mb-3">
                    <span className="d-block"><strong>Monto:</strong> ${don.monto.toLocaleString()}</span>
                    <span className="d-block"><strong>Fecha:</strong> {don.fecha}</span>
                  </Card.Text>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <Badge className="p-2 fs-6" bg={don.estado === "Completada" ? "light" : "dark"} text={don.estado === "Completada" ? "success" : "light"}>
                    {don.estado === "Completada" ? <><FaCheckCircle className="me-1" /> Completada</> 
                     : <><FaClock className="me-1" /> Pendiente</>}
                  </Badge>

                  {don.estado === "Pendiente" && (
                    <span className="fst-italic text-white">Procesando donación...</span>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
