import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { updateClient } from '../services/clientService';


export default function ClientEditModal({ show, handleClose, client, onUpdated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
    }
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError('Por favor, completa ambos campos.');
      return;
    }

   try {
      const updatedData = { name, email };

      
      const updatedClient = await updateClient(client.id, updatedData);
      
      handleClose(); 

      
      onUpdated(updatedClient); 

    } catch (err) {
      setError('Error al actualizar el cliente.');
      console.error(err);
    }
  };

  if (!client) return null; 

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente: {client.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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