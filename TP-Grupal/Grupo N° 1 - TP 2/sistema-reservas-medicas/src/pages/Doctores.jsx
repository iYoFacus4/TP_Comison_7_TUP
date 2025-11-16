import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  ListGroup,
  Badge,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useDoctors } from "../hooks/useDoctors";

const DoctorsExample = () => {
  const {
    doctors,
    especialidades,
    isLoading,
    error,
    filterByEspecialidad,
    searchDoctors,
    fetchDoctors,
  } = useDoctors();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEspecialidad, setSelectedEspecialidad] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedEspecialidad("");
    searchDoctors(value);
  };

  const handleFilterEspecialidad = (e) => {
    const value = e.target.value;
    setSelectedEspecialidad(value);
    setSearchTerm("");

    if (value === "") {
      fetchDoctors();
    } else {
      filterByEspecialidad(value);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Doctores Disponibles</h2>

          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Label>Buscar por nombre o matrícula</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Buscar doctor..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Form.Label>Filtrar por especialidad</Form.Label>
                  <Form.Select
                    value={selectedEspecialidad}
                    onChange={handleFilterEspecialidad}
                  >
                    <option value="">Todas las especialidades</option>
                    {especialidades.map((esp) => (
                      <option key={esp} value={esp}>
                        {esp}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {error && (
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          )}

          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Cargando doctores...</p>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <Badge bg="info">{doctors.length} doctores encontrados</Badge>
              </div>

              <Row>
                {doctors.map((doctor) => (
                  <Col key={doctor.id} md={6} lg={4} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{doctor.nombre}</Card.Title>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <strong>Especialidad:</strong>{" "}
                            <Badge bg="primary">{doctor.especialidad}</Badge>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Matrícula:</strong> {doctor.matricula}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Teléfono:</strong> {doctor.telefono}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Email:</strong> {doctor.email}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <small className="text-muted">
                              {doctor.horarioAtencion}
                            </small>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              {doctors.length === 0 && !isLoading && (
                <Alert variant="info">
                  No se encontraron doctores con los criterios seleccionados.
                </Alert>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorsExample;
