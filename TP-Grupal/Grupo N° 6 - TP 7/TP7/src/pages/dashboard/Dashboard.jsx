import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { useFetch } from '../../hooks/useFetch';
import { getMiembros, createMiembro } from '../../services/miembrosService';
import { getDataCards } from '../../services/reportesService';
import { createUsuario } from '../../services/usuariosService';
import CardComponent from '../../components/Card';
import TablaUser from '../../components/TablaUser';
import { PeopleFill, PersonCheckFill, PersonXFill } from 'react-bootstrap-icons';

const Dashboard = () => {
  const {
    data: metrics,
    loading: loadingMetrics,
    error: errorMetrics,
    refetch: refetchMetrics,
  } = useFetch(getDataCards);

  const {
    data: users,
    loading: loadingUsers,
    error: errorUsers,
    refetch: refetchUsers,
  } = useFetch(getMiembros);

  const loading = loadingMetrics || loadingUsers;
  const error = errorMetrics || errorUsers;
  

  // Estado del modal
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefono: '',
    plan: 'Básico',
    status: 'Activo',
    fechaIngreso: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openModal = () => {
    setSaveError(null);
    setFormData({
      name: '',
      email: '',
      telefono: '',
      plan: 'Básico',
      status: 'Activo',
      fechaIngreso: '',
      password: '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    if (!saving) setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      // 1️⃣ Crear el SOCIO
      await createMiembro({
        name: formData.name,
        email: formData.email,
        telefono: formData.telefono,
        plan: formData.plan,
        status: formData.status,
        fechaIngreso: formData.fechaIngreso || null,
      });

      // 2️⃣ Crear cuenta de USUARIO (login)
      await createUsuario({
        email: formData.email,
        password: formData.password,
      });

      // Refrescar datos visibles
      await refetchUsers();
      await refetchMetrics();

      setShowModal(false);
    } catch (err) {
      console.error(err);
      setSaveError(err.message || 'Error al crear el usuario');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '80vh' }}
      >
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 fs-4">Cargando panel...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">

      {/* Título + botón agregar */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="h2">Dashboard</h1>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={openModal}>
            + Agregar usuario
          </Button>
        </Col>
      </Row>

      {/* Cards */}
      {metrics && (
        <Row className="mb-4">
          <CardComponent
            titulo="Miembros Totales"
            valor={metrics.totalSocios}
            variante="primary"
            icono={<PeopleFill />}
          />
          <CardComponent
            titulo="Miembros Activos"
            valor={metrics.sociosActivos}
            variante="success"
            icono={<PersonCheckFill />}
          />
          <CardComponent
            titulo="Miembros Inactivos"
            valor={metrics.sociosInactivos}
            variante="danger"
            icono={<PersonXFill />}
          />
        </Row>
      )}

      {/* Tabla de usuarios / socios */}
      <Row>
        <Col>
          <h2 className="h4 mb-3">Usuarios</h2>
          {users && <TablaUser usuarios={users} />}
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton={!saving}>
          <Modal.Title>Agregar nuevo usuario</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {saveError && <Alert variant="danger">{saveError}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Plan</Form.Label>
              <Form.Select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
              >
                <option value="Básico">Básico</option>
                <option value="Full">Full</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de ingreso</Form.Label>
              <Form.Control
                type="date"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña (login)</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal} disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Dashboard;
