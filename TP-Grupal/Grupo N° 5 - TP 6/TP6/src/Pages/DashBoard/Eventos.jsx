// src/Pages/Dashboard/Eventos.jsx
import React, { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import ModalFormularioEvento from "../../Components/EventCard.jsx";
import TablaComponent from "../../Components/Tabla.jsx";
// --- ¡IMPORTAMOS LA FUNCIÓN deleteById! ---
import { getAll, deleteById } from "../../Utils/utils";

function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [esEdicion, setEsEdicion] = useState(false);

  const cargarEventos = () => {
    const listaActualizada = getAll("eventos");
    setEventos(listaActualizada);
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const handleVerDetalle = (evento) => {
    setEventoSeleccionado(evento);
    setEsEdicion(true);
    setShowModal(true);
  };

  const handleAbrirModalParaCrear = () => {
    setEventoSeleccionado(null);
    setEsEdicion(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    cargarEventos(); // Recargamos por si hubo cambios
  };

  // --- ¡NUEVA FUNCIÓN PARA MANEJAR LA ELIMINACIÓN! ---
  const handleEliminar = (eventoAEliminar) => {
    // Pedimos confirmación al usuario para evitar errores
    if (window.confirm(`¿Estás seguro de que quieres eliminar el evento "${eventoAEliminar.nombre}"?`)) {
      try {
        deleteById('eventos', eventoAEliminar.id);
        // Recargamos la lista de eventos para que el cambio se vea en la tabla
        cargarEventos();
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        alert("No se pudo eliminar el evento.");
      }
    }
  };


  const columnasEventos = [
    { header: "Nombre", field: "nombre" },
    { header: "Fecha", field: "fecha" },
    { header: "Lugar", field: "lugar" },
    {
      header: "Ocupación / Artistas",
      render: (item) => `${item.asistentes.length}/${item.cupo} (${item.artistas.length})`,
    },
  ];

  return (
    <Container fluid className="my-4">
      <div className="d-flex justify-content-center">
        <h2 className="mb-4">Panel de Eventos</h2>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="primary" onClick={handleAbrirModalParaCrear} className="mb-4">
          <i className="bi bi-calendar-plus-fill me-2"></i> Añadir Nuevo Evento
        </Button>
      </div>
      <Card className="shadow-sm">
        <Card.Header as="h5" className="bg-dark text-white">
          Listado de Eventos
        </Card.Header>
        <Card.Body>
          <TablaComponent
            datos={eventos}
            columnas={columnasEventos}
            onVerDetalle={handleVerDetalle}
            // --- CONECTAMOS LA NUEVA FUNCIÓN AL BOTÓN ---
            onEliminar={handleEliminar}
          />
        </Card.Body>
      </Card>

      <ModalFormularioEvento
        show={showModal}
        handleClose={handleModalClose}
        onEventAdded={cargarEventos}
        eventoAEditar={eventoSeleccionado}
        esEdicion={esEdicion}
      />
    </Container>
  );
}

export default Eventos;