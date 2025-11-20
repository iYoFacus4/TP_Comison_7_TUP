import React, { useState } from "react";
import { Button, Container, Card, Spinner, Alert } from "react-bootstrap";
import TablaComponent from "../../Components/Tabla.jsx";
import ModalFormularioAsistente from "../../Components/AsistenteCard.jsx";
// 1. Importar Hook y Servicios
import { useFetch } from "../../hooks/useFetch.js";
import { getAllAsistentes, deleteAsistenteById } from "../../services/asistentesService.js";

function Asistentes() {
  // 2. Usar el Hook
  const { data: asistentes, loading, error, refresh } = useFetch(getAllAsistentes);
  
  const [showModal, setShowModal] = useState(false);
  const [asistenteSeleccionado, setAsistenteSeleccionado] = useState(null);
  const [esEdicion, setEsEdicion] = useState(false);

  // 3. Ya no necesitamos 'cargarAsistentes' ni 'useEffect'

  const columnas = [
    { header: "Nombre", field: "nombre" },
    { header: "Apellido", field: "apellido" },
    {
      header: "Fecha Nacimiento",
      render: (item) => {
        if (!item.fechaNac) return 'N/A'; 

        const fechaObj = new Date(item.fechaNac);
        const dia = fechaObj.getUTCDate().toString().padStart(2, '0');
        const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, '0');
        const anio = fechaObj.getUTCFullYear();

        // 3. Devolvemos el formato DD/MM/YYYY
        return `${dia}/${mes}/${anio}`;
      }
    },
  ];

  const handleVerDetalle = (asistente) => {
    setAsistenteSeleccionado(asistente);
    setEsEdicion(true);
    setShowModal(true);
  };

  const handleAbrirModalParaCrear = () => {
    setAsistenteSeleccionado(null);
    setEsEdicion(false);
    setShowModal(true);
  };

  // 4. Función de Eliminar (ahora es async y llama al servicio)
  const handleEliminar = async (asistente) => {
    if (window.confirm(`¿Está seguro de que desea eliminar a ${asistente.nombre} ${asistente.apellido}?`)) {
      try {
        await deleteAsistenteById(asistente.id);
        refresh(); // Recarga la tabla
        console.log(`Asistente ID ${asistente.id} eliminado.`);
      } catch (error) {
        alert("Error al eliminar el asistente.");
        console.error(error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEsEdicion(false);
    setAsistenteSeleccionado(null);
    refresh(); // Recargamos para ver los cambios
  };

  // 5. Manejo de estados del hook
  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">Error al cargar asistentes: {error}</Alert></Container>;

  return (
    <Container fluid className="my-4">
      <div className="d-flex justify-content-center">
        <h2 className="mb-4">Panel de Asistentes</h2>
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleAbrirModalParaCrear} className="mb-4">
          <i className="bi bi-person-plus-fill me-2"></i>
          Añadir Nuevo Asistente
        </Button>
      </div>
      <Card className="shadow-sm">
        <Card.Header as="h5" className="bg-dark text-white">
          Listado de Asistentes
        </Card.Header>
        <Card.Body>
          <TablaComponent
            datos={asistentes || []} // Aseguramos que sea un array
            columnas={columnas}
            onVerDetalle={handleVerDetalle}
            onEliminar={handleEliminar}
          />
        </Card.Body>
      </Card>

      <ModalFormularioAsistente
        show={showModal}
        handleClose={handleModalClose}
        onAsistenteAdded={refresh} // Usamos refresh
        asistenteAEditar={asistenteSeleccionado}
        esEdicion={esEdicion}
      />
    </Container>
  );
}

export default Asistentes;