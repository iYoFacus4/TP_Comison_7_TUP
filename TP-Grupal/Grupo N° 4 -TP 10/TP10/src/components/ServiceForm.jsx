// src/components/ServiceForm.jsx
import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { addService } from '../services/hairServiceAPI';

export default function ServiceForm({ onServiceAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !price || !duration) {
      setError('Nombre, Duración y Precio son obligatorios.');
      return;
    }

   try {
      const newServiceData = { 
        name, 
        description, 
        duration: parseInt(duration), 
        price: parseFloat(price),
        available: true 
      };
     const createdService = await addService(newServiceData);
      
      setSuccess(`Servicio "${name}" agregado con éxito.`);
      setName('');
      setDescription('');
      setDuration('');
      setPrice('');
      
      if (onServiceAdded) {
        
        onServiceAdded(createdService); 
      }

    } catch (err) {
      setError('Error al guardar el servicio. Intenta de nuevo.');
      console.error(err);
    }
  };

  return (
    <div className='mb-4 p-3 border rounded bg-light'>
      <h5>Agregar Servicio</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                placeholder="Ej: Corte Clásico"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Label>Duración (min)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Precio ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 7000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Descripción (Opcional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Una breve descripción del servicio"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="success" type="submit">Guardar Servicio</Button>
        
        {error && <Alert variant="danger" className='mt-2'>{error}</Alert>}
        {success && <Alert variant="success" className='mt-2'>{success}</Alert>}
      </Form>
    </div>
  );
}