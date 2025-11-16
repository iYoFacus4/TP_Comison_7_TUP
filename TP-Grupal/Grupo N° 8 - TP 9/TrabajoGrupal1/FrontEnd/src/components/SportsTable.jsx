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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [editForm, setEditForm] = useState({
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
    setSelectedSport(sport);
    setEditForm({
      nombre: sport.nombre,
      miembros: sport.miembros,
      estado: sport.estado,
    });
    setShowEditModal(true);
  };

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
    {
      key: 'acciones',
      label: 'Acciones',
      render: (item) => (
        <div className="action-buttons-inline">
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
        </div>
      ),
    },
  ];

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
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
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
      </Modal>
    </div>
  );
});

export default SportsTable;