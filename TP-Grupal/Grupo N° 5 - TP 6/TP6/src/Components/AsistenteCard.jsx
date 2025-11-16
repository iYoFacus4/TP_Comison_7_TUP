import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { addItem, updateItem } from '../Utils/utils'; 

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

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            if (esEdicion) {
                // Si es modo edición, llamamos a la función de actualizar
                updateItem('asistentes', asistente.id, asistente);
            } else {
                // Si es modo creación, llamamos a la función de agregar
                addItem('asistentes', asistente);
            }
            onAsistenteAdded(); // Recarga la tabla en la página principal
            handleClose(); // Cierra el modal
        } catch (error) {
            alert("Error al guardar el asistente. Revisa la consola.");
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-success text-white">
                {/* Título dinámico */}
                <Modal.Title>{esEdicion ? "Editar Asistente" : "Registrar Nuevo Asistente"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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
                    {/* Puedes añadir más campos como DNI, Email, etc. si los necesitas */}
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type="date" name="fechaNac" value={asistente.fechaNac} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100 mt-3">
                        {/* Texto del botón dinámico */}
                        {esEdicion ? "GUARDAR CAMBIOS" : "REGISTRAR ASISTENTE"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalFormularioAsistente;