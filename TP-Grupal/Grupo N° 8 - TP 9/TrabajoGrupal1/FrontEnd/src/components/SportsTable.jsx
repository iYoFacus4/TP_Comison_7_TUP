<<<<<<< HEAD
// /FrontEnd/src/components/SportsTable/SportsTable.jsx (VERSION FINAL API)

import { useState, useEffect, forwardRef } from 'react';
import { Badge, Button, Modal, Form } from 'react-bootstrap';
// Asegúrate de que la ruta sea correcta
import apiService from '../../apiService'; 
import DataTable from './ui/DataTable';
import './SportsTable.css';

const SportsTable = forwardRef((props, ref) => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para modales y formularios
=======
// FrontEnd/src/components/SportsTable.jsx (MODIFICADO)
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Badge, Button, Modal, Form } from "react-bootstrap";
import DataTable from "./ui/DataTable";
import "./SportsTable.css";

// 1. IMPORTAMOS EL apiService
import apiService from "../services/apiService";

// 2. ACEPTAMOS PROPS DEL PADRE ('Deportes.jsx')
const SportsTable = forwardRef(({ initialDeportes, setGlobalError }, ref) => {
  
  // 3. USAMOS EL ESTADO INTERNO 'sports' PERO LO INICIALIZAMOS CON EL PROP
  const [sports, setSports] = useState(initialDeportes || []);
>>>>>>> main
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  
  const [editForm, setEditForm] = useState({
<<<<<<< HEAD
    nombre: '',
    miembros: 0,
    estado: 'Activo',
  });
  const [addForm, setAddForm] = useState({
    nombre: '',
    miembros: 0,
    estado: 'Activo',
  });

  // =========================================================
  // FUNCIONES DE API (CRUD)
  // =========================================================

  // 1. LECTURA (GET)
  const fetchSports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAll('sports');
      setSports(data);
    } catch (err) {
      console.error('Error al cargar deportes:', err);
      setError('No se pudieron cargar los deportes.');
      setSports([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  // 2. CREACIÓN (POST)
  const handleSaveAdd = async () => {
    if (!addForm.nombre || addForm.miembros < 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
    try {
      // Llama a la API para crear el nuevo deporte
      await apiService.createItem('sports', addForm);
      await fetchSports(); // Recargar la lista para mostrar el nuevo deporte
      handleCloseAddModal();
      alert(`Deporte "${addForm.nombre}" agregado con éxito.`);
    } catch (err) {
      alert('Error al agregar el deporte.');
      console.error('Error al crear deporte:', err);
    }
  };

  // 3. ACTUALIZACIÓN (PATCH)
  const handleSaveEdit = async () => {
    if (!selectedSport) return;
    if (!editForm.nombre || editForm.miembros < 0) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
    try {
      // Llama a la API para actualizar el deporte
      await apiService.updateItem('sports', selectedSport.id, editForm);
      await fetchSports(); // Recargar la lista
      handleCloseEditModal();
      alert(`Deporte "${editForm.nombre}" actualizado con éxito.`);
    } catch (err) {
      alert('Error al actualizar el deporte.');
      console.error('Error al actualizar deporte:', err);
    }
  };
  
  // 4. ELIMINACIÓN (DELETE)
  const handleDeleteSport = async (id, nombre) => {
    if (!window.confirm(`¿Está seguro de eliminar el deporte: ${nombre}? Esta acción es irreversible.`)) {
      return;
    }
    try {
      // Llama a la API para eliminar el deporte
      await apiService.deleteItem('sports', id);
      await fetchSports(); // Recargar la lista
      alert(`Deporte "${nombre}" eliminado con éxito.`);
    } catch (err) {
      alert('Error al eliminar el deporte.');
      console.error('Error al eliminar deporte:', err);
    }
  };

  // 5. CAMBIAR ESTADO (PATCH específico)
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
    try {
      // Llama a la API para actualizar solo el campo 'estado'
      await apiService.updateItem('sports', id, { estado: newStatus });
      await fetchSports(); // Recargar la lista
      alert(`Estado cambiado a ${newStatus} con éxito.`);
    } catch (err) {
      alert('Error al cambiar el estado del deporte.');
      console.error('Error al cambiar estado:', err);
    }
  };

  // =========================================================
  // FUNCIONES DE UI
  // =========================================================

  const handleShowAddModal = () => {
    setAddForm({ nombre: '', miembros: 0, estado: 'Activo' });
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  
  const handleShowEditModal = (sport) => {
=======
    nombre: "",
    estado: "Activo",
    // ¡EL CAMPO 'miembros' FUE ELIMINADO INTENCIONALMENTE!
  });
  const [addForm, setAddForm] = useState({
    nombre: "",
    estado: "Activo",
    // ¡EL CAMPO 'miembros' FUE ELIMINADO INTENCIONALMENTE!
  });

  // 4. ¡ELIMINADO!
  // Ya no necesitamos el useEffect para cargar desde localStorage
  // useEffect(() => { ... localStorage.getItem("sports") ... }, []);

  // 5. (Sin cambios) Exponer función para abrir modal
  useImperativeHandle(ref, () => ({
    openAddModal: handleOpenAddModal
  }));

  // 6. ¡ELIMINADO!
  // Ya no necesitamos la función 'updateSports' de localStorage
  // const updateSports = (updatedSports) => { ... };

  // 7. REFACTORIZADO: Lógica de acciones (Activar/Desactivar)
  const handleToggleEstado = async (id, nuevoEstado) => {
    try {
      const sportToUpdate = sports.find((s) => s.id === id);
      const updatedSportData = { ...sportToUpdate, estado: nuevoEstado };

      // 7a. Llamamos al backend (PUT /api/deportes/:id)
      await apiService.updateItem('deportes', id, updatedSportData);

      // 7b. Actualizamos el estado local
      const updatedSports = sports.map((sport) =>
        sport.id === id ? { ...sport, estado: nuevoEstado } : sport
      );
      setSports(updatedSports);
      setGlobalError(null);

    } catch (err) {
      setGlobalError(err.message || "Error al cambiar el estado del deporte.");
    }
  };

  // 8. (Sin cambios) Ver detalles del deporte
  const handleView = (id) => {
    const sport = sports.find((s) => s.id === id);
    setSelectedSport(sport);
    setShowViewModal(true);
  };

  // 9. REFACTORIZADO: Abrir modal de Edición
  const handleEdit = (id) => {
    const sport = sports.find((s) => s.id === id);
>>>>>>> main
    setSelectedSport(sport);
    setEditForm({
      nombre: sport.nombre,
      estado: sport.estado,
      // ¡EL CAMPO 'miembros' NO SE CARGA!
    });
    setShowEditModal(true);
  };

<<<<<<< HEAD
  const handleCloseEditModal = () => {
    setSelectedSport(null);
    setShowEditModal(false);
  };

  const getStatusBadge = (estado) => {
    const variant = estado === 'Activo' ? 'success' : 'danger';
    return (
      <Badge bg={variant} className="status-badge">
        {estado}
      </Badge>
    );
  };
  
  // Definición de columnas para DataTable
  const columns = [
    {
      key: 'nombre',
      label: 'Deporte',
      render: (item) => <span className="sport-name">{item.nombre}</span>,
    },
    {
      key: 'miembros',
      label: 'Miembros',
      render: (item) => <span className="member-count">{item.miembros}</span>,
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (item) => getStatusBadge(item.estado),
    },
=======
  // 10. REFACTORIZADO: Guardar cambios de edición
  const handleSaveEdit = async () => {
    if (!editForm.nombre.trim()) {
      alert("El nombre del deporte es requerido");
      return;
    }
    
    try {
      const sportData = {
        nombre: editForm.nombre,
        estado: editForm.estado,
        // ¡NO ENVIAMOS 'miembros'!
        // (La descripción también se podría agregar aquí si la tuvieras en el form)
      };

      // 10a. Llamamos al backend
      const updatedSport = await apiService.updateItem('deportes', selectedSport.id, sportData);

      // 10b. Actualizamos el estado local
      const updatedSports = sports.map((sport) =>
        sport.id === selectedSport.id
          ? { ...sport, ...updatedSport } // Usamos la respuesta del backend
          : sport
      );
      setSports(updatedSports);
      setShowEditModal(false);
      setSelectedSport(null);
      setGlobalError(null);

    } catch (err) {
      setGlobalError(err.message || "Error al actualizar el deporte.");
    }
  };

  // (El resto de 'handleCloseModals' se mantiene igual)
  const handleCloseEditModal = () => { setShowEditModal(false);
    setSelectedSport(null); };
  const handleCloseViewModal = () => { setShowViewModal(false);
    setSelectedSport(null); };
  const handleCloseAddModal = () => { setShowAddModal(false); };

  // 11. REFACTORIZADO: Abrir modal de agregar
  const handleOpenAddModal = () => {
    setAddForm({
      nombre: "",
      estado: "Activo",
      // ¡SIN 'miembros'!
    });
    setShowAddModal(true);
  };
  

  // 12. REFACTORIZADO: Guardar nuevo deporte
  const handleSaveAdd = async () => {
    if (!addForm.nombre.trim()) {
      alert("El nombre del deporte es requerido");
      return;
    }
    
    try {
      const newSportData = {
        nombre: addForm.nombre,
        estado: addForm.estado,
        // ¡NO ENVIAMOS 'miembros'!
      };
      
      // 12a. Llamamos al backend
      const createdSport = await apiService.createItem('deportes', newSportData);
      
      // 12b. Actualizamos el estado local
      const updatedSports = [...sports, createdSport];
      setSports(updatedSports);
      setShowAddModal(false);
      setGlobalError(null);

    } catch (err) {
      setGlobalError(err.message || "Error al crear el deporte.");
    }
  };

  // (El Badge de estado se mantiene igual)
  const getStatusBadge = (estado) => { /* ... */ };

  // 13. (Casi sin cambios) Definir columnas
  const columns = [
    { key: "nombre", label: "Nombre del Deporte", /* ... */ },
    {
      key: "miembros",
      label: "Miembros (Simulado)", // Cambiamos el label
      // ¡Esta columna sigue mostrando el dato 'miembros' que 
      // viene de la BD, pero ya no se puede editar!
      render: (item) => {
        const miembros = item.miembros || 0;
        return <span className="member-count">{miembros}</span>;
      },
    },
    { key: "estado", label: "Estado", /* ... */ },
>>>>>>> main
    {
      key: 'acciones',
      label: 'Acciones',
      render: (item) => (
        <div className="action-buttons-inline">
<<<<<<< HEAD
          <Button
            variant="link"
            className="action-btn edit-btn"
            onClick={() => handleShowEditModal(item)}
          >
            <i className="bi bi-pencil-square"></i> Editar
          </Button>
          <Button
            variant="link"
            className={`action-btn ${
              item.estado === 'Activo' ? 'deactivate-btn' : 'activate-btn'
            }`}
            onClick={() => handleToggleStatus(item.id, item.estado)}
          >
            {item.estado === 'Activo' ? 'Desactivar' : 'Activar'}
          </Button>
          <Button
            variant="link"
            className="action-btn delete-btn"
            onClick={() => handleDeleteSport(item.id, item.nombre)}
          >
            <i className="bi bi-trash"></i> Eliminar
          </Button>
=======
          <Button variant="link" onClick={() => handleEdit(item.id)}>Editar</Button>
          <Button variant="link" onClick={() => handleView(item.id)}>Ver</Button>
          {item.estado === "Activo" ? (
            <Button variant="link" className="deactivate-btn" onClick={() => handleToggleEstado(item.id, 'Inactivo')}>
              Desactivar
            </Button>
          ) : (
            <Button variant="link" className="activate-btn" onClick={() => handleToggleEstado(item.id, 'Activo')}>
              Activar
            </Button>
          )}
>>>>>>> main
        </div>
      ),
    },
  ];

<<<<<<< HEAD
  if (loading) {
    return <p>Cargando deportes...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="sports-table-container">
      <div className="table-wrapper">
        <Button 
          variant="success" 
          onClick={handleShowAddModal} 
          className="mb-3"
        >
          <i className="bi bi-plus-lg me-2"></i>
          Agregar Nuevo Deporte
        </Button>

        <DataTable
          data={sports}
          columns={columns}
          searchable={true}
          searchPlaceholder="Buscar por nombre de deporte..."
        />
      </div>

      {/* Modal para Agregar Deporte */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Deporte</Modal.Title>
        </Modal.Header>
=======
  // (Filtros se mantiene igual)
  const filters = [ ];

  return (
    <div className="sports-table-container">
      {/* 14. DATATABLE: Ahora 'data={sports}' usa el estado local */}
      <DataTable
  data={sports}
  columns={columns}
  searchable={true}
  searchPlaceholder="Buscar por nombre de deporte"
  filters={filters}
  selectable={false}
/>;

      {/* MODAL DE EDICIÓN (MODIFICADO) */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton><Modal.Title>Editar Deporte</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
              <Form.Control type="text" value={editForm.nombre} onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })} />
            </Form.Group>
            
            {/* ¡CAMPO 'MIEMBROS' ELIMINADO! */}

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select value={editForm.estado} onChange={(e) => setEditForm({ ...editForm, estado: e.target.value })}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL DE AGREGAR (MODIFICADO) */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton><Modal.Title>Agregar Nuevo Deporte</Modal.Title></Modal.Header>
>>>>>>> main
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
<<<<<<< HEAD
              <Form.Control
                type="text"
                placeholder="Ej: Fútbol"
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
                  setAddForm({ ...addForm, miembros: parseInt(e.target.value) || 0 })
                }
              />
            </Form.Group>
=======
              <Form.Control type="text" value={addForm.nombre} onChange={(e) => setAddForm({ ...addForm, nombre: e.target.value })} />
            </Form.Group>

            {/* ¡CAMPO 'MIEMBROS' ELIMINADO! */}
>>>>>>> main

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select value={addForm.estado} onChange={(e) => setAddForm({ ...addForm, estado: e.target.value })}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>Cancelar</Button>
          <Button variant="success" onClick={handleSaveAdd}>Agregar Deporte</Button>
        </Modal.Footer>
      </Modal>

<<<<<<< HEAD
      {/* Modal para Editar Deporte */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Deporte: {selectedSport?.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
              <Form.Control
                type="text"
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
                value={editForm.miembros}
                onChange={(e) =>
                  setEditForm({ ...editForm, miembros: parseInt(e.target.value) || 0 })
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
=======
      {/* (Modal de Vista se mantiene igual) */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
       {/* ... */}
>>>>>>> main
      </Modal>
    </div>
  );
});

<<<<<<< HEAD
=======
SportsTable.displayName = "SportsTable";
>>>>>>> main
export default SportsTable;