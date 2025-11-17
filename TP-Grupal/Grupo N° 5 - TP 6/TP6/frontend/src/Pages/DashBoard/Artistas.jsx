import { useState } from "react";
import { Container, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import TablaComponent from "../../Components/Tabla.jsx";
import ModalFormularioArtista from "../../Components/ArtistaCard.jsx";
// 1. Importar Hook y Servicios
import { useFetch } from "../../hooks/useFetch.js";
import { getAllArtistas, deleteArtistaById } from "../../services/artistasService.js";

function Artistas() {
  // 2. Usar el Hook (renombramos 'data' a 'artistas')
  const { data: artistas, loading, error, refresh } = useFetch(getAllArtistas);
  
  const [showModal, setShowModal] = useState(false);
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);
  const [esEdicion, setEsEdicion] = useState(false);

  // 3. Ya no necesitamos 'cargarArtistas' ni 'useEffect' para cargar

  const handleVerDetalle = (artista) => {
    setArtistaSeleccionado(artista);
    setEsEdicion(true);
    setShowModal(true);
  };

  const handleAbrirModalParaCrear = () => {
    setArtistaSeleccionado(null);
    setEsEdicion(false);
    setShowModal(true);
  };

  // 4. Función de Eliminar (ahora es async y llama al servicio)
  const handleEliminar = async (artista) => {
    if (window.confirm(`¿Está seguro de eliminar a ${artista.nombreArt}?`)) {
      try {
        await deleteArtistaById(artista.id);
        refresh(); // Recarga la tabla
      } catch (error) {
        alert("Error al eliminar el artista.");
        console.error(error);
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    refresh(); // Recargamos para ver los cambios
  };

  const columnas = [
    { header: "Nombre Artístico", field: "nombreArt" },
    { header: "Nombre", field: "nombre" },
    { header: "Apellido", field: "apellido" },
    {
      header: "Disponibilidad",
      render: (artista) => (
        <Badge bg={artista.disponible ? 'success' : 'danger'}>
          {artista.disponible ? 'Disponible' : 'Ocupado'}
        </Badge>
      ),
    },
  ];

  // 5. Manejo de estados del hook
  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">Error al cargar artistas: {error}</Alert></Container>;

  return (
    <Container fluid className="my-4">
      <div className="d-flex justify-content-center">
        <h2 className="mb-4">Panel de Artistas</h2>
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleAbrirModalParaCrear} className="mb-4">
          <i className="bi bi-music-note-beamed me-2"></i>
          Añadir Nuevo Artista
        </Button>
      </div>
      <Card className="shadow-sm">
        <Card.Header as="h5" className="bg-dark text-white">
          Listado de Artistas
        </Card.Header>
        <Card.Body>
          <TablaComponent
            datos={artistas || []} // Aseguramos que sea un array
            columnas={columnas}
            onVerDetalle={handleVerDetalle}
            onEliminar={handleEliminar} // Añadimos la prop de eliminar
          />
        </Card.Body>
      </Card>

      <ModalFormularioArtista
        show={showModal}
        handleClose={handleModalClose}
        onArtistaAdded={refresh} // Usamos refresh
        artistaAEditar={artistaSeleccionado}
        esEdicion={esEdicion}
      />
    </Container>
  );
}

export default Artistas;