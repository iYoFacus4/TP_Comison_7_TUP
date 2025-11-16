import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Badge,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { ESPECIALIDADES, STATUS_TURNO } from "../constants";
import Modal from "../components/Modal";
import TurnoForm from "../components/TurnoForm";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [turnos, setTurnos] = useState([]);
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha: "",
    especialidad: "",
    busqueda: "",
  });
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    confirmados: 0,
    pendientes: 0,
    cancelados: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("nuevo"); // 'nuevo' o 'editar'
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  useEffect(() => {
    // Datos simulados más completos para el dashboard
    const datosSimulados = [
      {
        id: 1,
        paciente: "Juan Pérez",
        medico: "Dr. García",
        fecha: "2024-10-25",
        hora: "09:00",
        especialidad: "Cardiología",
        status: "Confirmado",
        telefono: "123-456-7890",
        email: "juan.perez@email.com",
      },
      {
        id: 2,
        paciente: "María López",
        medico: "Dra. Martínez",
        fecha: "2024-10-25",
        hora: "10:30",
        especialidad: "Pediatría",
        status: "Pendiente",
        telefono: "098-765-4321",
        email: "maria.lopez@email.com",
      },
      {
        id: 3,
        paciente: "Carlos Ruiz",
        medico: "Dr. Fernández",
        fecha: "2024-10-25",
        hora: "11:00",
        especialidad: "Traumatología",
        status: "Confirmado",
        telefono: "555-123-4567",
        email: "carlos.ruiz@email.com",
      },
      {
        id: 4,
        paciente: "Ana García",
        medico: "Dra. Rodríguez",
        fecha: "2024-10-25",
        hora: "14:00",
        especialidad: "Dermatología",
        status: "Pendiente",
        telefono: "777-888-9999",
        email: "ana.garcia@email.com",
      },
      {
        id: 5,
        paciente: "Luis Morales",
        medico: "Dr. Silva",
        fecha: "2024-10-25",
        hora: "15:30",
        especialidad: "Neurología",
        status: "Cancelado",
        telefono: "333-444-5555",
        email: "luis.morales@email.com",
      },
      {
        id: 6,
        paciente: "Elena Vargas",
        medico: "Dra. Castro",
        fecha: "2024-10-26",
        hora: "08:30",
        especialidad: "Ginecología",
        status: "Confirmado",
        telefono: "666-777-8888",
        email: "elena.vargas@email.com",
      },
    ];
    setTurnos(datosSimulados);
    setTurnosFiltrados(datosSimulados);
  }, []);

  useEffect(() => {
    // Calcular estadísticas
    const stats = {
      total: turnos.length,
      confirmados: turnos.filter((t) => t.status === "Confirmado").length,
      pendientes: turnos.filter((t) => t.status === "Pendiente").length,
      cancelados: turnos.filter((t) => t.status === "Cancelado").length,
    };
    setEstadisticas(stats);
  }, [turnos]);

  useEffect(() => {
    // Aplicar filtros
    let filtrados = turnos;

    if (filtros.fecha) {
      filtrados = filtrados.filter((turno) => turno.fecha === filtros.fecha);
    }

    if (filtros.especialidad) {
      filtrados = filtrados.filter(
        (turno) => turno.especialidad === filtros.especialidad
      );
    }

    if (filtros.busqueda) {
      const busqueda = filtros.busqueda.toLowerCase();
      filtrados = filtrados.filter(
        (turno) =>
          turno.paciente.toLowerCase().includes(busqueda) ||
          turno.medico.toLowerCase().includes(busqueda) ||
          turno.especialidad.toLowerCase().includes(busqueda)
      );
    }

    setTurnosFiltrados(filtrados);
  }, [turnos, filtros]);

  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      fecha: "",
      especialidad: "",
      busqueda: "",
    });
  };

  const handleAccionTurno = (id, accion) => {
    let nuevosTurnos = [...turnos];
    const turnoIndex = nuevosTurnos.findIndex((t) => t.id === id);

    if (turnoIndex !== -1) {
      switch (accion) {
        case "confirmar":
          nuevosTurnos[turnoIndex].status = "Confirmado";
          break;
        case "cancelar":
          nuevosTurnos[turnoIndex].status = "Cancelado";
          break;
        case "eliminar":
          nuevosTurnos = nuevosTurnos.filter((t) => t.id !== id);
          break;
        default:
          break;
      }
      setTurnos(nuevosTurnos);
    }
  };

  const handleNuevoTurno = () => {
    setModalType("nuevo");
    setTurnoSeleccionado(null);
    setShowModal(true);
  };

  const handleEditarTurno = (id) => {
    const turno = turnos.find((t) => t.id === id);
    if (turno) {
      setModalType("editar");
      setTurnoSeleccionado(turno);
      setShowModal(true);
    }
  };

  const handleSaveTurno = (turnoData) => {
    if (modalType === "nuevo") {
      setTurnos((prev) => [...prev, turnoData]);
    } else {
      setTurnos((prev) =>
        prev.map((t) => (t.id === turnoData.id ? turnoData : t))
      );
    }
    setShowModal(false);
    setTurnoSeleccionado(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTurnoSeleccionado(null);
  };

  const getStatusBadge = (status) => {
    const variants = {
      Confirmado: "success",
      Pendiente: "warning",
      Cancelado: "danger",
      Completado: "info",
    };
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>;
  };

  const fechaHoy = new Date().toISOString().split("T")[0];

  return (
    <Container className="mt-4">
      {/* Encabezado con Usuario */}
      {isAuthenticated && user && (
        <Row className="mb-3">
          <Col>
            <Alert variant="info" className="mb-0">
              <strong>Bienvenido/a, {user.email}</strong>
              <span className="float-end">
                <Badge bg="success">Autenticado</Badge>
              </span>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5 className="text-primary">{estadisticas.total}</h5>
              <small>Total Turnos</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5 className="text-success">{estadisticas.confirmados}</h5>
              <small>Confirmados</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5 className="text-warning">{estadisticas.pendientes}</h5>
              <small>Pendientes</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h5 className="text-danger">{estadisticas.cancelados}</h5>
              <small>Cancelados</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <h5>Filtros y Búsqueda</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                      type="date"
                      value={filtros.fecha}
                      onChange={(e) =>
                        handleFiltroChange("fecha", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Especialidad</Form.Label>
                    <Form.Select
                      value={filtros.especialidad}
                      onChange={(e) =>
                        handleFiltroChange("especialidad", e.target.value)
                      }
                    >
                      <option value="">Todas las especialidades</option>
                      {ESPECIALIDADES.map((esp) => (
                        <option key={esp} value={esp}>
                          {esp}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Búsqueda</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Buscar por paciente, médico o especialidad..."
                        value={filtros.busqueda}
                        onChange={(e) =>
                          handleFiltroChange("busqueda", e.target.value)
                        }
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={limpiarFiltros}
                      >
                        Limpiar
                      </Button>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabla de Turnos */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Turnos ({turnosFiltrados.length})</h5>
              <Button variant="primary" size="sm" onClick={handleNuevoTurno}>
                + Nuevo Turno
              </Button>
            </Card.Header>
            <Card.Body>
              {turnosFiltrados.length === 0 ? (
                <Alert variant="info">
                  No se encontraron turnos con los filtros aplicados.
                </Alert>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Paciente</th>
                        <th>Médico</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Especialidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnosFiltrados.map((turno) => (
                        <tr key={turno.id}>
                          <td>{turno.id}</td>
                          <td>
                            <div>
                              <strong>{turno.paciente}</strong>
                              <br />
                              <small className="text-muted">
                                {turno.email}
                              </small>
                            </div>
                          </td>
                          <td>{turno.medico}</td>
                          <td>{turno.fecha}</td>
                          <td>{turno.hora}</td>
                          <td>{turno.especialidad}</td>
                          <td>{getStatusBadge(turno.status)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              {turno.status === "Pendiente" && (
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() =>
                                    handleAccionTurno(turno.id, "confirmar")
                                  }
                                >
                                  ✓
                                </Button>
                              )}
                              {turno.status !== "Cancelado" && (
                                <Button
                                  variant="warning"
                                  size="sm"
                                  onClick={() =>
                                    handleAccionTurno(turno.id, "cancelar")
                                  }
                                >
                                  ✗
                                </Button>
                              )}
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleEditarTurno(turno.id)}
                              >
                                ✏️
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  handleAccionTurno(turno.id, "eliminar")
                                }
                              >
                                🗑️
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para Nuevo/Editar Turno */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        title={modalType === "nuevo" ? "Nuevo Turno" : "Editar Turno"}
        onSave={() => {}} // Se maneja en el formulario
        onCancel={handleCloseModal}
        saveText="Guardar"
        cancelText="Cancelar"
        size="lg"
      >
        <TurnoForm
          turno={turnoSeleccionado}
          onSave={handleSaveTurno}
          onCancel={handleCloseModal}
          turnosExistentes={turnos}
        />
      </Modal>
    </Container>
  );
};

export default Dashboard;
