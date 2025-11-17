import { useEffect, useState } from "react";
import { getActividadesConCupos } from "../../services/actividadesService";
import {
  getReservasBySocio,
  createReserva,
  cancelarReserva
} from "../../services/reservasService";

import { useAuthStore } from "../../store/auth";
import { Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";

export default function HomeUsuario() {
  const user = useAuthStore((s) => s.user);
  const socioId = user?.id;

  const [actividades, setActividades] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState(null);

  // Cargar datos iniciales
  async function cargarDatos() {
    try {
      setLoading(true);
      const acts = await getActividadesConCupos();
      const res = await getReservasBySocio(socioId);
      setActividades(acts);
      setReservas(res);
    } catch (err) {
      setMsg({ type: "danger", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  // Reservar actividad
  async function handleReservar(actividadId) {
    try {
      const fecha = new Date().toISOString().slice(0, 10);

      await createReserva({
        socio_id: socioId,
        actividad_id: actividadId,
        fecha
      });

      setMsg({ type: "success", text: "Reserva creada correctamente" });
      cargarDatos();
    } catch (err) {
      setMsg({ type: "danger", text: err.message });
    }
  }

  // Cancelar reserva
  async function handleCancelar(id) {
    try {
      await cancelarReserva(id);
      setMsg({ type: "success", text: "Reserva cancelada" });
      cargarDatos();
    } catch (err) {
      setMsg({ type: "danger", text: err.message });
    }
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="p-4">

      <h2 className="mb-4">Bienvenido, {user.email}</h2>

      {msg && (
        <Alert variant={msg.type} onClose={() => setMsg(null)} dismissible>
          {msg.text}
        </Alert>
      )}

      {/* ACTIVIDADES */}
      <h3 className="mb-3">Actividades Disponibles</h3>
      <Row>
        {actividades.map((act) => (
          <Col md={4} key={act.id} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{act.nombre}</Card.Title>
                <Card.Text>
                  <strong>Horario:</strong> {act.horario} <br />
                  <strong>Días:</strong> {act.dias} <br />
                  <strong>Cupo:</strong> {act.cuposOcupados ?? 0}/{act.cupoMaximo}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleReservar(act.id)}
                >
                  Reservar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* RESERVAS */}
      <h3 className="mt-4 mb-3">Mis Reservas</h3>
      {reservas.length === 0 ? (
        <p>No tienes reservas aún.</p>
      ) : (
        reservas.map((r) => (
          <Card key={r.id} className="mb-2">
            <Card.Body>
              <strong>{r.actividad_nombre}</strong> — {r.fecha} — {r.estado}
              {r.estado === "activa" && (
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-3"
                  onClick={() => handleCancelar(r.id)}
                >
                  Cancelar
                </Button>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

