import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col, ListGroup, Badge, Spinner } from 'react-bootstrap';
import {
  addEvento,
  updateEvento,
  getEventoById,
  asociarArtistaAEvento, 
  inscribirAsistenteAEvento,
  removerArtistaDeEvento,
  removerAsistenteDeEvento
} from '../services/eventosService';
import { getAllArtistas, getArtistaById, updateArtista } from '../services/artistasService';
import { getAllAsistentes, getAsistenteById } from '../services/asistentesService';

function ModalFormularioEvento({ show, handleClose, onEventAdded, eventoAEditar, esEdicion }) {
  const initialState = {
    nombre: '',
    fecha: '',
    lugar: '',
    cupo: 0,
    artistas: [],
    asistentes: [],
  };

  const [evento, setEvento] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [artistasDisponibles, setArtistasDisponibles] = useState([]);
  const [artistaSeleccionadoId, setArtistaSeleccionadoId] = useState('');
  const [asistentesDisponibles, setAsistentesDisponibles] = useState([]);
  const [asistenteSeleccionadoId, setAsistenteSeleccionadoId] = useState('');

  const eventoSeguro = {
    ...evento,
    artistas: Array.isArray(evento.artistas) ? evento.artistas : [],
    asistentes: Array.isArray(evento.asistentes) ? evento.asistentes : [],
  };

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      if (show) {
        setLoading(true);
        try {
          const [artistas, asistentes] = await Promise.all([
            getAllArtistas(),
            getAllAsistentes()
          ]);
          setArtistasDisponibles(artistas);
          setAsistentesDisponibles(asistentes);

          if (esEdicion && eventoAEditar) {
            const eventoActualizado = await getEventoById(eventoAEditar.id);
            const fechaString = eventoActualizado.fecha; 
            const fechaFormateada = fechaString.split('T')[0]; 
            setEvento({ ...eventoActualizado, fecha: fechaFormateada });
          } else {
            setEvento(initialState);
          }
        } catch (error) {
          console.error("Error cargando datos para el modal", error);
          alert("Error al cargar datos del modal.");
        } finally {
          setLoading(false);
        }
      }
    };
    cargarDatosIniciales();
  }, [eventoAEditar, esEdicion, show]);

  // Asociar artista
  const handleAsociarArtista = async () => {
    if (!artistaSeleccionadoId) return;

    try {
      const artistaId = parseInt(artistaSeleccionadoId);
      const artista = artistasDisponibles.find(a => a.id === artistaId);

      if (!artista.disponible) {
        alert(`El artista ${artista.nombreArt} ya se encuentra ocupado.`);
        return;
      }
      if (eventoSeguro.artistas.some(a => a.id === artistaId)) {
        alert(`El artista ${artista.nombreArt} ya está asociado a este evento.`);
        return;
      }
      await asociarArtistaAEvento(eventoSeguro.id, artistaId);
      await updateArtista(artistaId, { ...artista, disponible: false });
      
      refrescarDatosDelModal();
    } catch (error) {
      console.error(error);
      alert("Error al asociar el artista.");
    }
  };

  // Remover artista
  const handleRemoverArtista = async (idArtistaARemover) => {
if (!window.confirm("¿Seguro que quieres quitar a este artista del evento?")) {
      return;
    }
    
    try {
      const artista = await getArtistaById(idArtistaARemover); //
      await removerArtistaDeEvento(eventoSeguro.id, idArtistaARemover);
      if (artista) {
        await updateArtista(idArtistaARemover, { ...artista, disponible: true }); //
      }
      refrescarDatosDelModal();
    } catch (error) {
      console.error(error);
      alert("Error al remover el artista.");
    }
  };

  // Inscribir asistente
  const handleInscribirAsistente = async () => {
    if (!asistenteSeleccionadoId) return;

    try {
      const asistenteId = parseInt(asistenteSeleccionadoId);
      if (eventoSeguro.asistentes.length >= eventoSeguro.cupo) {
        alert("¡Cupo completo!");
        return;
      }
      if (eventoSeguro.asistentes.some(a => a.id === asistenteId)) {
        alert("Este asistente ya está inscrito.");
        return;
      }
      await inscribirAsistenteAEvento(eventoSeguro.id, asistenteId);
      refrescarDatosDelModal();
    } catch (error) {
      console.error(error);
      alert("Error al inscribir asistente.");
    }
  };

  // Remover asistente
  const handleRemoverAsistente = async (idAsistenteARemover) => {
if (!window.confirm("¿Seguro que quieres quitar a este asistente del evento?")) {
      return;
    }

    try {
      await removerAsistenteDeEvento(eventoSeguro.id, idAsistenteARemover);
      refrescarDatosDelModal();
    } catch (error) {
      console.error(error);
      alert("Error al remover asistente.");
    }
  };

  const refrescarDatosDelModal = async () => {
    setLoading(true);
    try {
      const [eventoRefrescado, artistas, asistentes] = await Promise.all([
        getEventoById(eventoSeguro.id),
        getAllArtistas(),
        getAllAsistentes()
      ]);

      const fechaString = eventoRefrescado.fecha;
      const fechaFormateada = fechaString.split('T')[0]; // "2025-11-21"
      setEvento({ ...eventoRefrescado, fecha: fechaFormateada });
      setArtistasDisponibles(artistas);
      setAsistentesDisponibles(asistentes);
      setArtistaSeleccionadoId('');
      setAsistenteSeleccionadoId('');
    } catch (error) {
      console.error("Error refrescando modal", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //const fechaParaGuardar = eventoSeguro.fecha.split('-').reverse().join('-');
    const cupoNumerico = parseInt(eventoSeguro.cupo, 10) || 0;
    const datosAGuardar = { ...eventoSeguro, cupo: cupoNumerico, fecha: eventoSeguro.fecha };

    try {
      if (esEdicion) {
        await updateEvento(eventoSeguro.id, datosAGuardar);
      } else {
        await addEvento({ ...datosAGuardar, artistas: [], asistentes: [] });
      }
      onEventAdded();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error al guardar el evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>{esEdicion ? "Gestionar Evento" : "Registrar Nuevo Evento"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" /> <p>Cargando datos...</p>
          </div>
        )}

        {!loading && (
          <Form onSubmit={handleSubmit}>
            <h5>Detalles del Evento</h5>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Evento</Form.Label>
              <Form.Control type="text" name="nombre" value={eventoSeguro.nombre} onChange={handleChange} required />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Fecha</Form.Label>
                <Form.Control type="date" name="fecha" value={eventoSeguro.fecha} onChange={handleChange} required />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Cupo Máximo</Form.Label>
                <Form.Control type="number" name="cupo" value={eventoSeguro.cupo} onChange={handleChange} min="1" required />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Lugar</Form.Label>
              <Form.Control type="text" name="lugar" value={eventoSeguro.lugar} onChange={handleChange} required />
            </Form.Group>

            {/* ARTISTAS */}
            {esEdicion && (
              <div className="mt-4 p-3 border rounded">
                <h5>Artistas del Evento</h5>
                <ListGroup variant="flush" className="mb-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {eventoSeguro.artistas.length > 0 ? (
                    eventoSeguro.artistas.map(artista => (
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

                <h6>Asociar Nuevo Artista</h6>
                <Row>
                  <Col md={8}>
                    <Form.Select
                      value={artistaSeleccionadoId}
                      onChange={(e) => setArtistaSeleccionadoId(e.target.value)}
                    >
                      <option value="">Selecciona un artista...</option>
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

            {/* ASISTENTES */}
            {esEdicion && (
              <div className="mt-4 p-3 border rounded bg-light">
                <h5>
                  Asistentes del Evento
                  <Badge bg="dark" className="ms-2">
                    {eventoSeguro.asistentes.length} / {eventoSeguro.cupo}
                  </Badge>
                </h5>

                <ListGroup variant="flush" className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {eventoSeguro.asistentes.length > 0 ? (
                    eventoSeguro.asistentes.map(asistente => (
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

                <h6>Inscribir Nuevo Asistente</h6>
                <Row>
                  <Col md={8}>
                    <Form.Select
                      value={asistenteSeleccionadoId}
                      onChange={(e) => setAsistenteSeleccionadoId(e.target.value)}
                      disabled={eventoSeguro.asistentes.length >= eventoSeguro.cupo}
                    >
                      <option value="">Selecciona un asistente...</option>
                      {asistentesDisponibles.map(asistente => {
                        const yaInscrito = eventoSeguro.asistentes.some(a => a.id === asistente.id);
                        if (yaInscrito) return null;
                        return (
                          <option key={asistente.id} value={asistente.id}>
                            {asistente.nombre} {asistente.apellido}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Button
                      variant="success"
                      onClick={handleInscribirAsistente}
                      className="w-100"
                      disabled={eventoSeguro.asistentes.length >= eventoSeguro.cupo}
                    >
                      Inscribir
                    </Button>
                  </Col>
                </Row>

                {eventoSeguro.asistentes.length >= eventoSeguro.cupo && (
                  <div className="text-danger mt-2 fw-bold">¡Cupo completo!</div>
                )}
              </div>
            )}

            <Button variant="success" type="submit" className="w-100 mt-4" disabled={loading}>
              {esEdicion ? "GUARDAR CAMBIOS" : "REGISTRAR EVENTO"}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalFormularioEvento;
