// Archivo: src/Components/EventCard.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { 
    addItem, 
    updateItem, 
    getAll, 
    getById,
    agregarArtistaAEvento, 
    removerArtistaDeEvento,
    inscribirAsistenteAEvento, 
    removerAsistenteDeEvento   
} from '../Utils/utils';

function ModalFormularioEvento({ show, handleClose, onEventAdded, eventoAEditar, esEdicion }) {
    const initialState = {
        nombre: '', fecha: '', lugar: '', cupo: '', artistas: [], asistentes: [],
    };
    
    const [evento, setEvento] = useState(initialState);
    
    // Estados para los selectores
    const [artistasDisponibles, setArtistasDisponibles] = useState([]);
    const [artistaSeleccionadoId, setArtistaSeleccionadoId] = useState('');
    const [asistentesDisponibles, setAsistentesDisponibles] = useState([]); 
    const [asistenteSeleccionadoId, setAsistenteSeleccionadoId] = useState(''); 

    useEffect(() => {
        if (show) {
            setArtistasDisponibles(getAll('artistas'));
            setAsistentesDisponibles(getAll('asistentes')); 
        }
        if (esEdicion && eventoAEditar) {
            const eventoActualizado = getById('eventos', eventoAEditar.id) || eventoAEditar;
            const fechaParaInput = eventoActualizado.fecha.split('-').reverse().join('-');
            setEvento({ ...eventoActualizado, fecha: fechaParaInput });
        } else {
            setEvento(initialState);
        }
    }, [eventoAEditar, esEdicion, show]);
    
    const handleAsociarArtista = () => {
        if (!artistaSeleccionadoId) {
            alert("Por favor, selecciona un artista.");
            return;
        }
        const resultado = agregarArtistaAEvento(evento.id, parseInt(artistaSeleccionadoId));
        if (!resultado.success) {
            alert(resultado.message);
            return;
        }
        refrescarDatosDelModal();
    };

    const handleRemoverArtista = (idArtistaARemover) => {
        removerArtistaDeEvento(evento.id, idArtistaARemover);
        refrescarDatosDelModal();
    };

    const handleInscribirAsistente = () => {
        if (!asistenteSeleccionadoId) {
            alert("Por favor, selecciona un asistente.");
            return;
        }

        const resultado = inscribirAsistenteAEvento(evento.id, parseInt(asistenteSeleccionadoId));
        
        if (!resultado.success) {
            alert(resultado.message); 
            return;
        }
        
        refrescarDatosDelModal();
    };

    const handleRemoverAsistente = (idAsistenteARemover) => {
        removerAsistenteDeEvento(evento.id, idAsistenteARemover);
        refrescarDatosDelModal();
    };


    const refrescarDatosDelModal = () => {
        // Recarga el evento
        const eventoRefrescado = getById('eventos', evento.id);
        if (eventoRefrescado) {
            const fechaParaInput = eventoRefrescado.fecha.split('-').reverse().join('-');
            setEvento({ ...eventoRefrescado, fecha: fechaParaInput });
        }
        // Recarga los selectores
        setArtistasDisponibles(getAll('artistas'));
        setArtistaSeleccionadoId('');
        setAsistentesDisponibles(getAll('asistentes')); 
        setAsistenteSeleccionadoId(''); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvento(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cupoNumerico = parseInt(evento.cupo, 10);
        const fechaParaGuardar = evento.fecha.split('-').reverse().join('-');

        const datosAGuardar = { 
            ...evento, 
            cupo: cupoNumerico, 
            fecha: fechaParaGuardar 
        };

        try {
            if (esEdicion) { 
                updateItem('eventos', evento.id, datosAGuardar);
            } else { 
                // Al crear, nos aseguramos que artistas y asistentes empiecen vacíos
                addItem('eventos', { ...datosAGuardar, artistas: [], asistentes: [] });
            }
            onEventAdded();
            handleClose(); 
        } catch (error) { 
            console.error(error);
            alert("Error al guardar el evento.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton className="bg-primary text-white">
                <Modal.Title>{esEdicion ? "Gestionar Evento" : "Registrar Nuevo Evento"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* --- Detalles del Evento (Sin cambios) --- */}
                    <h5>Detalles del Evento</h5>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del Evento</Form.Label>
                        <Form.Control type="text" name="nombre" value={evento.nombre} onChange={handleChange} required />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" name="fecha" value={evento.fecha} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Cupo Máximo</Form.Label>
                            <Form.Control type="number" name="cupo" value={evento.cupo} onChange={handleChange} min="1" required />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control type="text" name="lugar" value={evento.lugar} onChange={handleChange} required />
                    </Form.Group>
                    
                    {/* --- Sección de Artistas (Solo visible en Edición) --- */}
                    {esEdicion && (
                        <div className="mt-4 p-3 border rounded">
                            <h5>Artistas del Evento</h5>
                            <ListGroup variant="flush" className="mb-3">
                                {evento.artistas && evento.artistas.length > 0 ? (
                                    evento.artistas.map(artista => (
                                        <ListGroup.Item key={artista.id} className="d-flex justify-content-between align-items-center">
                                            <span>
                                                {artista.nombreArt} <Badge bg="secondary" pill>{artista.nombre}</Badge>
                                            </span>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleRemoverArtista(artista.id)}>
                                                Quitar
                                            </Button>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <p className="text-muted">Aún no hay artistas asociados.</p>
                                )}
                            </ListGroup>
                            
                            <h6 className="mt-3">Asociar Nuevo Artista</h6>
                            <Row>
                                <Col md={8}>
                                    <Form.Select 
                                        aria-label="Seleccionar artista"
                                        value={artistaSeleccionadoId}
                                        onChange={(e) => setArtistaSeleccionadoId(e.target.value)}
                                    >
                                        <option value="">Selecciona un artista para añadir...</option>
                                        {artistasDisponibles.map(artista => (
                                            <option key={artista.id} value={artista.id} disabled={!artista.disponible}>
                                                {artista.nombreArt} {artista.disponible ? '' : '(Ocupado)'}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={4}>
                                    <Button variant="info" onClick={handleAsociarArtista} className="w-100">
                                        Añadir Artista
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}

                    {/* --- ¡NUEVA SECCIÓN DE ASISTENTES! (Solo visible en Edición) --- */}
                    {esEdicion && (
                        <div className="mt-4 p-3 border rounded bg-light">
                            <h5>
                                Asistentes del Evento 
                                <Badge bg="dark" className="ms-2">
                                    {evento.asistentes.length} / {evento.cupo}
                                </Badge>
                            </h5>
                            
                            <ListGroup variant="flush" className="mb-3" style={{maxHeight: '200px', overflowY: 'auto'}}>
                                {evento.asistentes && evento.asistentes.length > 0 ? (
                                    evento.asistentes.map(asistente => (
                                        <ListGroup.Item key={asistente.id} className="d-flex justify-content-between align-items-center">
                                            <span>
                                                {asistente.nombre} {asistente.apellido}
                                            </span>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleRemoverAsistente(asistente.id)}>
                                                Quitar
                                            </Button>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <p className="text-muted">Aún no hay asistentes inscritos.</p>
                                )}
                            </ListGroup>
                            
                            <h6 className="mt-3">Inscribir Nuevo Asistente</h6>
                            <Row>
                                <Col md={8}>
                                    <Form.Select 
                                        aria-label="Seleccionar asistente"
                                        value={asistenteSeleccionadoId}
                                        onChange={(e) => setAsistenteSeleccionadoId(e.target.value)}
                                        // Deshabilitamos el selector si el cupo está lleno
                                        disabled={evento.asistentes.length >= evento.cupo} 
                                    >
                                        <option value="">Selecciona un asistente para inscribir...</option>
                                        {asistentesDisponibles.map(asistente => (
                                            <option key={asistente.id} value={asistente.id}>
                                                {asistente.nombre} {asistente.apellido}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={4}>
                                    <Button 
                                        variant="success" 
                                        onClick={handleInscribirAsistente} 
                                        className="w-100"
                                        // Deshabilitamos el botón si el cupo está lleno
                                        disabled={evento.asistentes.length >= evento.cupo}
                                    >
                                        Inscribir Asistente
                                    </Button>
                                </Col>
                            </Row>
                            {/* Mensaje de cupo lleno */}
                            {evento.asistentes.length >= evento.cupo && (
                                <div className="text-danger mt-2 fw-bold">
                                    ¡Cupo completo! No se pueden inscribir más asistentes.
                                </div>
                            )}
                        </div>
                    )}
                    {/* --- FIN DE LA NUEVA SECCIÓN --- */}


                    <Button variant="success" type="submit" className="w-100 mt-4">
                        {esEdicion ? "GUARDAR CAMBIOS" : "REGISTRAR EVENTO"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalFormularioEvento;
