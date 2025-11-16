import React, { useState } from "react";
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
  Spinner,
} from "react-bootstrap";
import { usePatients } from "../hooks/usePatients";
import PatientFormModal from "../components/PatientFormModal";

const Pacientes = () => {
  const {
    patients,
    isLoading,
    error,
    deletePatient,
    searchPatients,
    fetchPatients,
    createPatient,
    updatePatient,
  } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchPatients(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchPatients();
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este paciente?")) {
      const result = await deletePatient(id);
      if (result.success) {
        alert("Paciente eliminado exitosamente");
      } else {
        alert(`Error: ${result.error}`);
      }
    }
  };

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setShowModal(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleSavePatient = async (patientData) => {
    let result;

    if (selectedPatient) {
      result = await updatePatient(selectedPatient.id, patientData);
    } else {
      result = await createPatient(patientData);
    }

    if (result.success) {
      alert(result.message || "Operación exitosa");
      setSelectedPatient(null);
    } else {
      alert(`Error: ${result.error}`);
    }

    return result;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };

  if (isLoading) {
    return (
      <Container className="mt-4">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Cargando pacientes...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Gestión de Pacientes</h2>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={10}>
                  <Form.Label>Buscar paciente</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Buscar por nombre, apellido, DNI o email..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={handleClearSearch}
                    >
                      Limpiar
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={2} className="d-flex align-items-end">
                  <Badge bg="info" className="w-100 text-center py-2">
                    Total: {patients.length}
                  </Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Lista de Pacientes ({patients.length})</h5>
              <Button variant="primary" onClick={handleNewPatient}>
                + Nuevo Paciente
              </Button>
            </Card.Header>
            <Card.Body>
              {patients.length === 0 ? (
                <Alert variant="info">No se encontraron pacientes.</Alert>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nombre Completo</th>
                        <th>DNI</th>
                        <th>Fecha Nac.</th>
                        <th>Edad</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Obra Social</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient.id}>
                          <td>
                            <strong>
                              {patient.nombre} {patient.apellido}
                            </strong>
                          </td>
                          <td>{patient.dni}</td>
                          <td>
                            {new Date(
                              patient.fechaNacimiento
                            ).toLocaleDateString("es-AR")}
                          </td>
                          <td>{calcularEdad(patient.fechaNacimiento)} años</td>
                          <td>{patient.telefono}</td>
                          <td>{patient.email}</td>
                          <td>
                            <Badge bg="info">{patient.obraSocial}</Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleEditPatient(patient)}
                              >
                                Editar
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeletePatient(patient.id)}
                              >
                                Eliminar
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

      <PatientFormModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={handleSavePatient}
        patient={selectedPatient}
      />
    </Container>
  );
};

export default Pacientes;
