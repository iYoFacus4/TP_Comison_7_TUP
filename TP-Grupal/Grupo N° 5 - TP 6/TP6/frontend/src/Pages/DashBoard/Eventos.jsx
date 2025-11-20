import React, { useState } from "react";
import { Button, Container, Card, Spinner, Alert } from "react-bootstrap";
import ModalFormularioEvento from "../../Components/EventCard.jsx";
import TablaComponent from "../../Components/Tabla.jsx";
// 1. Importar Hook y Servicios
import { useFetch } from "../../hooks/useFetch.js";
import { getAllEventos, deleteEventoById } from "../../services/eventosService.js";

function Eventos() {
  // 2. Usar el Hook
  const { data: eventos, loading, error, refresh } = useFetch(getAllEventos);
  
  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [esEdicion, setEsEdicion] = useState(false);

  // 3. Ya no necesitamos 'cargarEventos' ni 'useEffect'

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
    refresh(); // Recargamos por si hubo cambios
  };

  // 4. Función de Eliminar (ahora es async y llama al servicio)
  const handleEliminar = async (eventoAEliminar) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el evento "${eventoAEliminar.nombre}"?`)) {
      try {
        await deleteEventoById(eventoAEliminar.id);
        refresh();
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        alert("No se pudo eliminar el evento.");
      }
    }
  };

  const columnasEventos = [
    { header: "Nombre", field: "nombre" },
    {
      header: "Fecha",
      render: (item) => {
        if (!item.fecha) return 'N/A';

        const fechaObj = new Date(item.fecha);
        const dia = fechaObj.getUTCDate().toString().padStart(2, '0');
        const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, '0');
        const anio = fechaObj.getUTCFullYear();

        // 3. Devolvemos el formato DD/MM/YYYY
        return `${dia}/${mes}/${anio}`;
      }
    },
    { header: "Lugar", field: "lugar" },
    {
  header: "Ocupación / Artistas",
  render: (item) => {
    const asistentes = Array.isArray(item.asistentes) ? item.asistentes.length : 0;
    const artistas = Array.isArray(item.artistas) ? item.artistas.length : 0;
    return `${asistentes}/${item.cupo ?? 0} (${artistas})`;
  },
},

  ];

  // 5. Manejo de estados del hook
  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">Error al cargar eventos: {error}</Alert></Container>;

  return (
    <Container fluid className="my-4">
      <div className="d-flex justify-content-center">
        <h2 className="mb-4">Panel de Eventos</h2>
      </div>
      <div className="d-flex justify-content-end">
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
            datos={eventos || []} // Aseguramos que sea un array
            columnas={columnasEventos}
            onVerDetalle={handleVerDetalle}
            onEliminar={handleEliminar}
          />
        </Card.Body>
      </Card>

      <ModalFormularioEvento
        show={showModal}
        handleClose={handleModalClose}
        onEventAdded={refresh} // Usamos refresh
        eventoAEditar={eventoSeleccionado}
        esEdicion={esEdicion}
      />
    </Container>
  );
}

export default Eventos;