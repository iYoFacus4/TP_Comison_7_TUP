import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {addClient} from '../services/clientService';

export default function ClientForm({onClientAdded}) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email) {
      setError('Por favor, completa ambos campos.');
      return;
    }

   try {
      const newClient = { name, email };
      await addClient(newClient);
      
      setSuccess(`Cliente "${name}" agregado con éxito.`);
      setName('');
      setEmail('');
      
      
      if (onClientAdded) {
        onClientAdded(); 
      }

    } catch (err) {
      setError('Error al guardar el cliente. Intenta de nuevo.');
      console.error(err);
    }
  };

  return (
    <div className='mb-4 p-3 border rounded bg-light'>
      <h5>Agregar Cliente</h5>
      <Form onSubmit={handleSubmit} className="d-flex gap-2 flex-wrap">
        <Form.Control
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="success" type="submit">Guardar</Button>
      </Form>
      
      {error && <Alert variant="danger" className='mt-2'>{error}</Alert>}
      {success && <Alert variant="success" className='mt-2'>{success}</Alert>}
    </div>
  );
}