import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { addItem, updateItem } from '../Utils/utils';

function ModalFormularioArtista({ show, handleClose, onArtistaAdded, artistaAEditar, esEdicion }) {
    
    const initialState = {
        nombre: '',
        apellido: '',
        nombreArt: '',
        dni: '',
        disponible: true,
    };
    
    const [artista, setArtista] = useState(initialState);

    useEffect(() => {
        if (esEdicion && artistaAEditar) {
            // Unimos el estado inicial con el artista a editar.
            // Esto asegura que todos los campos siempre tengan un valor definido.
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

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (esEdicion) {
                updateItem('artistas', artista.id, artista);
            } else {
                addItem('artistas', artista);
            }
            onArtistaAdded();
            handleClose(); 
        } catch (error) {
            alert("Error al guardar el Artista. Revisa la consola.");
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>{esEdicion ? "Editar Artista" : "Registrar Nuevo Artista"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        {esEdicion ? "GUARDAR CAMBIOS" : "REGISTRAR ARTISTA"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalFormularioArtista;
