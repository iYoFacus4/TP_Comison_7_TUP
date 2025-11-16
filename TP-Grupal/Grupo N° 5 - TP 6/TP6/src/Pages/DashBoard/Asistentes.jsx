import React, { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import TablaComponent from "../../Components/Tabla.jsx";
import ModalFormularioAsistente from "../../Components/AsistenteCard.jsx";
// 1. 🎯 CORRECCIÓN: Importar deleteById en lugar de remove
import { getAll, deleteById } from "../../Utils/utils"; 

function Asistentes() {
  const [asistentes, setAsistentes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // --- ESTADOS PARA LA EDICIÓN ---
  const [asistenteSeleccionado, setAsistenteSeleccionado] = useState(null);
  const [esEdicion, setEsEdicion] = useState(false);

  // Carga los asistentes desde la utilidad
  const cargarAsistentes = () => {
    const data = getAll("asistentes");
    setAsistentes(data);
  };

  useEffect(() => {
    cargarAsistentes();
  }, []);

  const columnas = [
    { header: "Nombre", field: "nombre" },
    { header: "Apellido", field: "apellido" },
    { header: "Fecha Nacimiento", field: "fechaNac" },
  ];

  // --- NUEVAS/MODIFICADAS FUNCIONES HANDLER ---

  // Se activa al hacer clic en "Ver Detalle" (Edición)
  const handleVerDetalle = (asistente) => {
    setAsistenteSeleccionado(asistente);
    setEsEdicion(true);
    setShowModal(true);
  };

  // Se activa al hacer clic en "Añadir Nuevo Asistente"
  const handleAbrirModalParaCrear = () => {
    setAsistenteSeleccionado(null);
    setEsEdicion(false);
    setShowModal(true);
  };

  // 🎯 FUNCIÓN PARA ELIMINAR ASISTENTE
  const handleEliminar = (asistente) => {
    // 1. Opcional: Confirmación del usuario
    if (window.confirm(`¿Está seguro de que desea eliminar a ${asistente.nombre} ${asistente.apellido}?`)) {
        
        // 2. 🎯 CORRECCIÓN: Llamar a deleteById con el tipo de tabla y el ID
        deleteById("asistentes", asistente.id); 

        // 3. Recarga la lista para reflejar el cambio en la interfaz
        cargarAsistentes();
        console.log(`Asistente ID ${asistente.id} eliminado.`);
    }
  };


  // Cierra el modal y resetea los estados de edición
  const handleModalClose = () => {
    setShowModal(false);
    setEsEdicion(false);
    setAsistenteSeleccionado(null);
    cargarAsistentes(); // Recargamos para ver los cambios
  };

  return (
    <Container fluid className="my-4">
      <div className="d-flex justify-content-center">
        <h2 className="mb-4">Panel de Asistentes</h2>
      </div>
      <div className="d-flex justify-content-center">
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
            datos={asistentes}
            columnas={columnas}
            onVerDetalle={handleVerDetalle}
            // CONEXIÓN: Usamos la función handleEliminar
            onEliminar={handleEliminar} 
          />
        </Card.Body>
      </Card>

      <ModalFormularioAsistente
        show={showModal}
        handleClose={handleModalClose}
        onAsistenteAdded={cargarAsistentes}
        asistenteAEditar={asistenteSeleccionado}
        esEdicion={esEdicion}
      />
    </Container>
  );
}

export default Asistentes;