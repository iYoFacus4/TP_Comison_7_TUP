import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
// 1. Importar servicios
import { addAsistente, updateAsistente } from '../services/asistentesService';

function ModalFormularioAsistente({ show, handleClose, onAsistenteAdded, asistenteAEditar, esEdicion }) {
  
  const initialState = {
    nombre: '',
    apellido: '',
    fechaNac: '',
    dni: '',
    email: '',
    telefono: '',
  };

  const [asistente, setAsistente] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (esEdicion && asistenteAEditar) {
      setAsistente(asistenteAEditar);
    } else {
      setAsistente(initialState);
    }
  }, [asistenteAEditar, esEdicion, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsistente(prev => ({ ...prev, [name]: value }));
  };

  // 2. Convertir handleSubmit en async
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (esEdicion) {
        // 3. Llamar al servicio de update
        await updateAsistente(asistente.id, asistente);
      } else {
        // 4. Llamar al servicio de add
        await addAsistente(asistente);
      }
      onAsistenteAdded(); // Recarga la tabla en la página principal
      handleClose(); // Cierra el modal
    } catch (error) {
      alert("Error al guardar el asistente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{esEdicion ? "Editar Asistente" : "Registrar Nuevo Asistente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* ... (Formulario sin cambios) ... */}
          <Row className="mb-3">
              <Form.Group as={Col}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="nombre" value={asistente.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" name="apellido" value={asistente.apellido} onChange={handleChange} required />
              </Form.Group>
          </Row>
          <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" name="fechaNac" value={asistente.fechaNac} onChange={handleChange} required />
          </Form.Group>
          {/* Puedes añadir más campos aquí si los agregas al initialState */}

          <Button variant="success" type="submit" className="w-100 mt-3" disabled={loading}>
            {loading ? "GUARDANDO..." : (esEdicion ? "GUARDAR CAMBIOS" : "REGISTRAR ASISTENTE")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalFormularioAsistente;