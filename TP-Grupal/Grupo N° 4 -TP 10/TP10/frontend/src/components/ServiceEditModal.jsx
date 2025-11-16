// src/components/ServiceEditModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { updateService } from '../services/hairServiceAPI';

export default function ServiceEditModal({ show, handleClose, service, onUpdated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description || '');
      setDuration(service.duration);
      setPrice(service.price);
      setAvailable(service.available);
    }
  }, [service]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedData = { 
        name, 
        description, 
        duration: parseInt(duration), 
        price: parseFloat(price),
        available
      };
      
      const updatedService = await updateService(service.id, updatedData);
      
      onUpdated(updatedService); // Llama al handler del padre

    } catch (err) {
      setError('Error al actualizar el servicio.');
      console.error(err);
    }
  };

  if (!service) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Servicio: {service.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Servicio</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Label>Duración (min)</Form.Label>
              <Form.Control
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check 
              type="switch"
              label="Servicio Disponible (Activo)"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}