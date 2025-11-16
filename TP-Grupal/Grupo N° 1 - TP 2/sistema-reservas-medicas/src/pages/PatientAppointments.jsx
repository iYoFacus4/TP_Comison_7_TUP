import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner, Table, Modal, Form, InputGroup } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

const PatientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, selectedDate, selectedStatus, searchTerm]);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(`/api/turnos/medico/${user.id}`);
      // const data = await response.json();
      
      // Datos simulados
      setTimeout(() => {
        const mockAppointments = [
          {
            id: 1,
            fecha: "2024-01-15",
            horario: "10:00",
            paciente: {
              nombre: "Juan",
              apellido: "Pérez",
              documento: "12345678",
              telefono: "3512345678",
              obraSocial: "OSDE",
            },
            estado: "confirmado",
            motivo: "Control general",
            observaciones: "Paciente con antecedentes de hipertensión",
          },
          {
            id: 2,
            fecha: "2024-01-15",
            horario: "11:00",
            paciente: {
              nombre: "María",
              apellido: "González",
              documento: "87654321",
              telefono: "3519876543",
              obraSocial: "Swiss Medical",
            },
            estado: "pendiente",
            motivo: "Consulta de seguimiento",
            observaciones: "",
          },
          {
            id: 3,
            fecha: "2024-01-16",
            horario: "09:30",
            paciente: {
              nombre: "Carlos",
              apellido: "López",
              documento: "11223344",
              telefono: "3511122334",
              obraSocial: "APROSS",
            },
            estado: "confirmado",
            motivo: "Primera consulta",
            observaciones: "Derivado por Dr. Martínez",
          },
          {
            id: 4,
            fecha: "2024-01-10",
            horario: "14:00",
            paciente: {
              nombre: "Ana",
              apellido: "Rodríguez",
              documento: "99887766",
              telefono: "3519988776",
              obraSocial: "OSDE",
            },
            estado: "completado",
            motivo: "Control post-operatorio",
            observaciones: "Evolución favorable",
          },
        ];
        setAppointments(mockAppointments);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError("Error al cargar los turnos. Por favor, intenta nuevamente.");
      setIsLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = [...appointments];

    // Filtrar por fecha
    if (selectedDate) {
      filtered = filtered.filter(apt => apt.fecha === selectedDate);
    }

    // Filtrar por estado
    if (selectedStatus !== "todos") {
      filtered = filtered.filter(apt => apt.estado === selectedStatus);
    }

    // Filtrar por búsqueda de paciente
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(apt => 
        apt.paciente.nombre.toLowerCase().includes(searchLower) ||
        apt.paciente.apellido.toLowerCase().includes(searchLower) ||
        apt.paciente.documento.includes(searchTerm)
      );
    }

    // Ordenar por fecha y horario
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.fecha}T${a.horario}`);
      const dateB = new Date(`${b.fecha}T${b.horario}`);
      return dateB - dateA; // Más recientes primero
    });

    setFilteredAppointments(filtered);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleChangeStatus = async (appointmentId, newStatus) => {
    try {
      // TODO: Reemplazar con llamada real al backend
      // await fetch(`/api/turnos/${appointmentId}/estado`, {
      //   method: 'PUT',
      //   body: JSON.stringify({ estado: newStatus })
      // });

      // Simulación: actualizar estado localmente
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, estado: newStatus } : apt
      ));

      alert(`Turno marcado como ${newStatus}`);
    } catch (err) {
      setError("Error al actualizar el estado del turno.");
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      confirmado: "success",
      pendiente: "warning",
      completado: "secondary",
      cancelado: "danger",
    };
    
    const labels = {
      confirmado: "Confirmado",
      pendiente: "Pendiente",
      completado: "Completado",
      cancelado: "Cancelado",
    };

    return <Badge bg={variants[status] || "primary"}>{labels[status] || status}</Badge>;
  };

  const todayAppointments = filteredAppointments.filter(apt => 
    apt.fecha === new Date().toISOString().split('T')[0]
  );

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando turnos de pacientes...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Agenda de Pacientes</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Resumen del día */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <h3>{todayAppointments.length}</h3>
              <p className="mb-0">Turnos Hoy</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <h3>{appointments.filter(apt => apt.estado === "completado").length}</h3>
              <p className="mb-0">Completados</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-warning text-white">
            <Card.Body>
              <h3>{appointments.filter(apt => apt.estado === "pendiente").length}</h3>
              <p className="mb-0">Pendientes</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Buscar Paciente</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre, apellido o DNI"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button 
            variant="secondary" 
            size="sm" 
            className="mt-2"
            onClick={() => {
              setSearchTerm("");
              setSelectedDate("");
              setSelectedStatus("todos");
            }}
          >
            Limpiar Filtros
          </Button>
        </Card.Body>
      </Card>

      {/* Lista de turnos */}
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Lista de Turnos ({filteredAppointments.length})</h5>
        </Card.Header>
        <Card.Body>
          {filteredAppointments.length === 0 ? (
            <Alert variant="info">No se encontraron turnos con los filtros seleccionados.</Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Paciente</th>
                  <th>Documento</th>
                  <th>Obra Social</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(apt => (
                  <tr key={apt.id}>
                    <td>{new Date(apt.fecha).toLocaleDateString('es-AR')}</td>
                    <td><strong>{apt.horario}</strong></td>
                    <td>{apt.paciente.apellido}, {apt.paciente.nombre}</td>
                    <td>{apt.paciente.documento}</td>
                    <td>{apt.paciente.obraSocial}</td>
                    <td>{apt.motivo}</td>
                    <td>{getStatusBadge(apt.estado)}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleViewDetails(apt)}
                        >
                          Ver
                        </Button>
                        {apt.estado === "pendiente" && (
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => handleChangeStatus(apt.id, "confirmado")}
                          >
                            Confirmar
                          </Button>
                        )}
                        {apt.estado === "confirmado" && (
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleChangeStatus(apt.id, "completado")}
                          >
                            Completar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal de detalles */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <Row>
                <Col md={6}>
                  <h5 className="text-primary">Información del Paciente</h5>
                  <p><strong>Nombre:</strong> {selectedAppointment.paciente.nombre} {selectedAppointment.paciente.apellido}</p>
                  <p><strong>Documento:</strong> {selectedAppointment.paciente.documento}</p>
                  <p><strong>Teléfono:</strong> {selectedAppointment.paciente.telefono}</p>
                  <p><strong>Obra Social:</strong> {selectedAppointment.paciente.obraSocial}</p>
                </Col>
                <Col md={6}>
                  <h5 className="text-primary">Información del Turno</h5>
                  <p><strong>Fecha:</strong> {new Date(selectedAppointment.fecha).toLocaleDateString('es-AR')}</p>
                  <p><strong>Horario:</strong> {selectedAppointment.horario}</p>
                  <p><strong>Estado:</strong> {getStatusBadge(selectedAppointment.estado)}</p>
                  <p><strong>Motivo:</strong> {selectedAppointment.motivo}</p>
                </Col>
              </Row>
              
              {selectedAppointment.observaciones && (
                <div className="mt-3">
                  <h5 className="text-primary">Observaciones</h5>
                  <Alert variant="info">{selectedAppointment.observaciones}</Alert>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PatientAppointments;
