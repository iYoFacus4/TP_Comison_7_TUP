import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
// 1. Importar servicios
import { addArtista, updateArtista } from '../services/artistasService';

function ModalFormularioArtista({ show, handleClose, onArtistaAdded, artistaAEditar, esEdicion }) {
  
  const initialState = {
    nombre: '',
    apellido: '',
    nombreArt: '',
    dni: '',
    disponible: true,
  };

  const [artista, setArtista] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (esEdicion && artistaAEditar) {
      setArtista({ ...initialState, ...artistaAEditar });
    } else {
      setArtista(initialState);
    }
  }, [artistaAEditar, esEdicion, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArtista(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 2. Convertir handleSubmit en async
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (esEdicion) {
        // 3. Llamar al servicio de update
        await updateArtista(artista.id, artista);
      } else {
        // 4. Llamar al servicio de add
        await addArtista(artista);
      }
      onArtistaAdded(); // Recarga la tabla en la página principal
      handleClose(); // Cierra el modal
    } catch (error) {
      alert("Error al guardar el Artista.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{esEdicion ? "Editar Artista" : "Registrar Nuevo Artista"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* ... (Formulario sin cambios) ... */}
          <Row className="mb-3">
              <Form.Group as={Col}>
                  <Form.Label>Nombre Artístico</Form.Label>
                  <Form.Control type="text" name="nombreArt" value={artista.nombreArt} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label>DNI</Form.Label>
                  <Form.Control type="text" name="dni" value={artista.dni} onChange={handleChange} required />
              </Form.Group>
          </Row>
          <Row className="mb-3">
              <Form.Group as={Col}>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="nombre" value={artista.nombre} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col}>
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" name="apellido" value={artista.apellido} onChange={handleChange} required />
              </Form.Group>
          </Row>
          
          {esEdicion && (
              <Form.Group className="mb-3 mt-3">
                  <Form.Check 
                      type="switch"
                      id="disponibilidad-switch"
                      label="Disponible para eventos"
                      name="disponible"
                      checked={artista.disponible}
                      onChange={handleChange}
                  />
              </Form.Group>
          )}

          <Button variant="success" type="submit" className="w-100 mt-3" disabled={loading}>
            {loading ? "GUARDANDO..." : (esEdicion ? "GUARDAR CAMBIOS" : "REGISTRAR ARTISTA")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalFormularioArtista;