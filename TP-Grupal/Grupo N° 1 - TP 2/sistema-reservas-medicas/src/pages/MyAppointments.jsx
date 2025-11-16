import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Alert, Spinner, Table, Modal, Form } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

const MyAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  // Simulación de carga de turnos del paciente
  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch(`/api/turnos/paciente/${user.id}`);
      // const data = await response.json();
      
      // Datos simulados
      setTimeout(() => {
        const mockAppointments = [
          {
            id: 1,
            fecha: "2024-01-15",
            horario: "10:00",
            medico: "Dr. García López",
            especialidad: "Cardiología",
            estado: "confirmado",
            consultorio: "3B",
          },
          {
            id: 2,
            fecha: "2024-01-22",
            horario: "15:30",
            medico: "Dra. Martínez Silva",
            especialidad: "Dermatología",
            estado: "pendiente",
            consultorio: "2A",
          },
          {
            id: 3,
            fecha: "2023-12-10",
            horario: "09:00",
            medico: "Dr. Rodríguez Paz",
            especialidad: "Medicina General",
            estado: "completado",
            consultorio: "1C",
          },
        ];
        setAppointments(mockAppointments);
        setIsLoading(false);
      }, 800);
    } catch (err) {
      setError("Error al cargar tus turnos. Por favor, intenta nuevamente.");
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const confirmCancelAppointment = async () => {
    try {
      // TODO: Reemplazar con llamada real al backend
      // await fetch(`/api/turnos/${selectedAppointment.id}/cancelar`, {
      //   method: 'PUT',
      //   body: JSON.stringify({ motivo: cancelReason })
      // });

      // Simulación: actualizar estado localmente
      setAppointments(appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, estado: "cancelado", motivoCancelacion: cancelReason }
          : apt
      ));

      setShowCancelModal(false);
      setSelectedAppointment(null);
      setCancelReason("");
      
      // Mostrar mensaje de éxito
      alert("Turno cancelado exitosamente");
    } catch (err) {
      setError("Error al cancelar el turno. Por favor, intenta nuevamente.");
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

  const canCancelAppointment = (appointment) => {
    const appointmentDate = new Date(`${appointment.fecha}T${appointment.horario}`);
    const now = new Date();
    const hoursDiff = (appointmentDate - now) / (1000 * 60 * 60);
    
    // Permitir cancelación si el turno es en más de 24 horas y no está completado/cancelado
    return hoursDiff > 24 && !["completado", "cancelado"].includes(appointment.estado);
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(`${apt.fecha}T${apt.horario}`) >= new Date() && apt.estado !== "cancelado"
  );

  const pastAppointments = appointments.filter(apt => 
    new Date(`${apt.fecha}T${apt.horario}`) < new Date() || apt.estado === "cancelado"
  );

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando tus turnos...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Mis Turnos</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* Próximos turnos */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Próximos Turnos ({upcomingAppointments.length})</h5>
        </Card.Header>
        <Card.Body>
          {upcomingAppointments.length === 0 ? (
            <Alert variant="info">No tienes turnos programados próximamente.</Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Médico</th>
                  <th>Especialidad</th>
                  <th>Consultorio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map(apt => (
                  <tr key={apt.id}>
                    <td>{new Date(apt.fecha).toLocaleDateString('es-AR')}</td>
                    <td>{apt.horario}</td>
                    <td>{apt.medico}</td>
                    <td>{apt.especialidad}</td>
                    <td>{apt.consultorio}</td>
                    <td>{getStatusBadge(apt.estado)}</td>
                    <td>
                      {canCancelAppointment(apt) ? (
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleCancelAppointment(apt)}
                        >
                          Cancelar
                        </Button>
                      ) : (
                        <span className="text-muted small">
                          {apt.estado === "cancelado" ? "Cancelado" : "No cancelable"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Historial de turnos */}
      <Card>
        <Card.Header className="bg-secondary text-white">
          <h5 className="mb-0">Historial ({pastAppointments.length})</h5>
        </Card.Header>
        <Card.Body>
          {pastAppointments.length === 0 ? (
            <Alert variant="info">No hay turnos en tu historial.</Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Médico</th>
                  <th>Especialidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pastAppointments.map(apt => (
                  <tr key={apt.id}>
                    <td>{new Date(apt.fecha).toLocaleDateString('es-AR')}</td>
                    <td>{apt.horario}</td>
                    <td>{apt.medico}</td>
                    <td>{apt.especialidad}</td>
                    <td>{getStatusBadge(apt.estado)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Modal de cancelación */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <Alert variant="warning">
                <strong>¿Estás seguro de cancelar este turno?</strong>
                <br />
                {new Date(selectedAppointment.fecha).toLocaleDateString('es-AR')} - {selectedAppointment.horario}
                <br />
                {selectedAppointment.medico} - {selectedAppointment.especialidad}
              </Alert>
              
              <Form.Group>
                <Form.Label>Motivo de cancelación (opcional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Ej: Surgió un imprevisto laboral"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Volver
          </Button>
          <Button variant="danger" onClick={confirmCancelAppointment}>
            Confirmar Cancelación
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyAppointments;
