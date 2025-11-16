import { useState, useEffect } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap"; // Importamos Badge
import { getAll } from "../../Utils/utils.js";
import TablaComponent from "../../Components/Tabla.jsx";
import ModalFormularioArtista from "../../Components/ArtistaCard.jsx";

function Artistas() {
  const [artistas, setArtistas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [artistaSeleccionado, setArtistaSeleccionado] = useState(null);
  const [esEdicion, setEsEdicion] = useState(false);

  const cargarArtistas = () => {
    setArtistas(getAll("artistas"));
  };

  useEffect(() => {
    cargarArtistas();
  }, []);

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

  const handleModalClose = () => {
    setShowModal(false);
    cargarArtistas();
  };

  // --- CAMBIO AQUÍ: Añadimos la columna "Disponibilidad" con un Badge ---
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

  return (
    <Container fluid className="my-4">
      <div className="d-flex justify-content-center">
        <h2 className="mb-4">Panel de Artistas</h2>
      </div>
      <div className="d-flex justify-content-center">
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
            datos={artistas}
            columnas={columnas}
            onVerDetalle={handleVerDetalle}
          />
        </Card.Body>
      </Card>

      <ModalFormularioArtista
        show={showModal}
        handleClose={handleModalClose}
        onArtistaAdded={cargarArtistas}
        artistaAEditar={artistaSeleccionado}
        esEdicion={esEdicion}
      />
    </Container>
  );
}

export default Artistas;