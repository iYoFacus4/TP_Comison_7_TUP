import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Badge, Button, Modal, Form } from "react-bootstrap";
import DataTable from "./ui/DataTable";
import "./SportsTable.css";

const SportsTable = forwardRef((props, ref) => {
  const [sports, setSports] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    miembros: 0,
    estado: "Activo",
  });
  const [addForm, setAddForm] = useState({
    nombre: "",
    miembros: 0,
    estado: "Activo",
  });

  // Pre carga los datos en la tabla con el useEffect
  useEffect(() => {
    const storedSports = localStorage.getItem("sports");

    const initialSports = [
      {
        id: 1,
        nombre: "Tenis",
        miembros: 32,
        estado: "Activo",
      },
      {
        id: 2,
        nombre: "Natación",
        miembros: 45,
        estado: "Activo",
      },
      {
        id: 3,
        nombre: "Básquet",
        miembros: 28,
        estado: "Activo",
      },
      {
        id: 4,
        nombre: "Yoga",
        miembros: 15,
        estado: "Inactivo",
      },
      {
        id: 5,
        nombre: "Karate",
        miembros: 22,
        estado: "Activo",
      },
      {
        id: 6,
        nombre: "Fútbol",
        miembros: 50,
        estado: "Activo",
      },
      {
        id: 7,
        nombre: "Voleibol",
        miembros: 18,
        estado: "Activo",
      },
      {
        id: 8,
        nombre: "Gimnasia",
        miembros: 25,
        estado: "Inactivo",
      },
    ];

    if (!storedSports) {
      // Cuando no hay datos en localStorage, precarga los datos iniciales
      localStorage.setItem("sports", JSON.stringify(initialSports));
      setSports(initialSports);
    } else {
      // Si existen datos, usarlos tal cual
      setSports(JSON.parse(storedSports));
    }
  }, []);

  // Exponer función para abrir modal desde el componente padre
  useImperativeHandle(ref, () => ({
    openAddModal: handleOpenAddModal
  }));

  // Actualizar deportes en estado y localStorage
  const updateSports = (updatedSports) => {
    setSports(updatedSports);
    localStorage.setItem("sports", JSON.stringify(updatedSports));
  };

  // Activar deporte
  const handleActivate = (id) => {
    const updatedSports = sports.map((sport) =>
      sport.id === id ? { ...sport, estado: "Activo" } : sport
    );
    updateSports(updatedSports);
  };

  // Desactivar deporte
  const handleDeactivate = (id) => {
    const updatedSports = sports.map((sport) =>
      sport.id === id ? { ...sport, estado: "Inactivo" } : sport
    );
    updateSports(updatedSports);
  };

  // Ver detalles del deporte
  const handleView = (id) => {
    const sport = sports.find((s) => s.id === id);
    setSelectedSport(sport);
    setShowViewModal(true);
  };

  // Editar deporte
  const handleEdit = (id) => {
    const sport = sports.find((s) => s.id === id);
    setSelectedSport(sport);
    setEditForm({
      nombre: sport.nombre,
      miembros: sport.miembros,
      estado: sport.estado,
    });
    setShowEditModal(true);
  };

  // Guardar cambios de edición
  const handleSaveEdit = () => {
    if (!editForm.nombre.trim()) {
      alert("El nombre del deporte es requerido");
      return;
    }
    
    const updatedSports = sports.map((sport) =>
      sport.id === selectedSport.id
        ? { ...sport, ...editForm, miembros: parseInt(editForm.miembros) || 0 }
        : sport
    );
    updateSports(updatedSports);
    setShowEditModal(false);
    setSelectedSport(null);
  };

  // Cerrar modales
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedSport(null);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedSport(null);
  };

  // Abrir modal de agregar
  const handleOpenAddModal = () => {
    setAddForm({
      nombre: "",
      miembros: 0,
      estado: "Activo",
    });
    setShowAddModal(true);
  };

  // Cerrar modal de agregar
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // Guardar nuevo deporte
  const handleSaveAdd = () => {
    if (!addForm.nombre.trim()) {
      alert("El nombre del deporte es requerido");
      return;
    }
    
    // Generar nuevo ID (máximo ID actual + 1)
    const newId = sports.length > 0 ? Math.max(...sports.map(s => s.id)) + 1 : 1;
    
    const newSport = {
      id: newId,
      nombre: addForm.nombre,
      miembros: parseInt(addForm.miembros) || 0,
      estado: addForm.estado,
    };
    
    const updatedSports = [...sports, newSport];
    updateSports(updatedSports);
    setShowAddModal(false);
  };

  // Badge de estado
  const getStatusBadge = (estado) => {
    switch (estado) {
      case "Activo":
        return (
          <Badge bg="success" className="status-badge">
            Activo
          </Badge>
        );
      case "Inactivo":
        return (
          <Badge bg="danger" className="status-badge">
            Inactivo
          </Badge>
        );
      default:
        return (
          <Badge bg="secondary" className="status-badge">
            {estado}
          </Badge>
        );
    }
  };

  // Definir columnas de la tabla
  const columns = [
    {
      key: "nombre",
      label: "Nombre del Deporte",
      render: (item) => <span className="sport-name">{item.nombre}</span>,
    },
    {
      key: "miembros",
      label: "Miembros",
      render: (item) => {
        const miembros = item.miembros || 0;
        return <span className="member-count">{miembros}</span>;
      },
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) => getStatusBadge(item.estado),
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="action-buttons-inline">
          <Button
            variant="link"
            className="action-btn edit-btn"
            onClick={() => handleEdit(item.id)}
            title="Editar"
          >
            Editar
          </Button>
          <Button
            variant="link"
            className="action-btn view-btn"
            onClick={() => handleView(item.id)}
            title="Ver"
          >
            Ver
          </Button>
          {item.estado === "Activo" ? (
            <Button
              variant="link"
              className="action-btn deactivate-btn"
              onClick={() => handleDeactivate(item.id)}
              title="Desactivar"
            >
              Desactivar
            </Button>
          ) : (
            <Button
              variant="link"
              className="action-btn activate-btn"
              onClick={() => handleActivate(item.id)}
              title="Activar"
            >
              Activar
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Filtros de estado
  const filters = [
    {
      key: "estado",
      label: "Estado",
      options: [
        { value: "Activo", label: "Activo" },
        { value: "Inactivo", label: "Inactivo" },
      ],
    },
  ];

  return (
    <div className="sports-table-container">
      <div className="table-wrapper">
        <DataTable
          data={sports}
          columns={columns}
          searchable={true}
          searchPlaceholder="Buscar por nombre de deporte"
          filters={filters}
          selectable={false}
        />
      </div>

      {/* Modal de Edición */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Deporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={editForm.nombre}
                onChange={(e) =>
                  setEditForm({ ...editForm, nombre: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cantidad de Miembros</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese la cantidad"
                value={editForm.miembros}
                onChange={(e) =>
                  setEditForm({ ...editForm, miembros: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={editForm.estado}
                onChange={(e) =>
                  setEditForm({ ...editForm, estado: e.target.value })
                }
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Vista */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Deporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSport && (
            <div className="sport-details">
              <div className="detail-row">
                <strong>Nombre:</strong>
                <span>{selectedSport.nombre}</span>
              </div>
              <div className="detail-row">
                <strong>Cantidad de Miembros:</strong>
                <span>{selectedSport.miembros}</span>
              </div>
              <div className="detail-row">
                <strong>Estado:</strong>
                <span>{getStatusBadge(selectedSport.estado)}</span>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Agregar Nuevo Deporte */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Deporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={addForm.nombre}
                onChange={(e) =>
                  setAddForm({ ...addForm, nombre: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cantidad de Miembros</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese la cantidad"
                value={addForm.miembros}
                onChange={(e) =>
                  setAddForm({ ...addForm, miembros: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={addForm.estado}
                onChange={(e) =>
                  setAddForm({ ...addForm, estado: e.target.value })
                }
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSaveAdd}>
            Agregar Deporte
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

SportsTable.displayName = "SportsTable";

export default SportsTable;
