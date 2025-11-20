// FrontEnd/src/components/SportsTable.jsx (CÓDIGO COMPLETO Y FINAL)
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Badge, Button, Modal, Form, Table, Alert, Spinner } from "react-bootstrap";
import DataTable from "./ui/DataTable";
import "./SportsTable.css";

// 1. IMPORTAMOS EL apiService
import apiService from "../services/apiService";

// 2. ACEPTAMOS PROPS DEL PADRE ('Deportes.jsx')
const SportsTable = forwardRef(({ initialDeportes, setGlobalError }, ref) => {
  
  // 3. USAMOS EL ESTADO INTERNO 'sports' PERO LO INICIALIZAMOS CON EL PROP
  useEffect(() => {
    setSports(initialDeportes);
  }, [initialDeportes]);

  const [sports, setSports] = useState(initialDeportes || []);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  
  // 1. NUEVOS ESTADOS PARA EL MODAL DE VISTA (LISTA DE SOCIOS)
  const [enrolledMembers, setEnrolledMembers] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);

  // Estado para el formulario de edición
  const [editForm, setEditForm] = useState({
    nombre: "",
    estado: "Activo",
  });
  // Estado para el formulario de agregar
  const [addForm, setAddForm] = useState({
    nombre: "",
    estado: "Activo",
  });


  useImperativeHandle(ref, () => ({
    openAddModal: handleOpenAddModal
  }));

  // 7. Lógica de acciones (Activar/Desactivar) - Sincronización
  const handleToggleEstado = async (id, nuevoEstado) => {
    try {
      const sportToUpdate = sports.find((s) => s.id === id);

      // VERIFICACIÓN DE SEGURIDAD
      if (!sportToUpdate) {
          setGlobalError("Error: Deporte no encontrado para actualizar.");
          return;
      }
      
      const updatedSportData = { ...sportToUpdate, estado: nuevoEstado };

      // 7a. Llamamos al backend y esperamos el objeto actualizado
      const updatedSportResponse = await apiService.updateItem('deportes', id, updatedSportData);

      // 7b. Actualizamos el estado local usando la forma funcional (más segura)
      setSports(prevSports => prevSports.map((sport) =>
        sport.id === id ? updatedSportResponse : sport // Reemplaza por la respuesta de la API
      ));
      setGlobalError(null);

    } catch (err) {
      setGlobalError(err.message || "Error al cambiar el estado del deporte.");
    }
  };

  // 8. Ver detalles del deporte (¡AHORA CON API!)
  const handleView = async (id) => { 
    const sport = sports.find((s) => s.id === id);
    
    if (!sport) return;

    setSelectedSport(sport); 
    setViewLoading(true);
    setGlobalError(null);

    try {
        // Llama al nuevo endpoint para obtener la lista de socios
        const members = await apiService.getAll(`deportes/${id}/socios`);
        setEnrolledMembers(members);
        setShowViewModal(true); // Abre el modal si la carga fue exitosa
    } catch (err) {
        setGlobalError(err.message || "Error al cargar la lista de inscritos.");
    } finally {
        setViewLoading(false);
    }
  };

  // 9. Abrir modal de Edición (¡CORREGIDO!)
  const handleEdit = (id) => {
    const sport = sports.find((s) => s.id === id);
    
    // VERIFICACIÓN DE SEGURIDAD
    if (!sport || !sport.id) {
        setGlobalError("Error: No se pudo encontrar la información del deporte.");
        return;
    }
    
    setSelectedSport(sport);
    setEditForm({
      nombre: sport.nombre || '', // Asignamos cadena vacía si es null/undefined
      estado: sport.estado || 'Activo',
    });
    setShowEditModal(true); // Abre el modal
  };

  // 10. Guardar cambios de edición - Sincronización
  const handleSaveEdit = async () => {
    // VERIFICACIÓN DE SEGURIDAD
    if (!selectedSport || !selectedSport.id || !editForm.nombre.trim()) {
      setGlobalError("Error: Información faltante para guardar.");
      return;
    }
    
    try {
      const id = selectedSport.id;
      
      const sportData = {
        nombre: editForm.nombre,
        estado: editForm.estado,
      };

      // 10a. Llamamos al backend y esperamos el objeto actualizado
      const updatedSportResponse = await apiService.updateItem('deportes', id, sportData);

      // 10b. Actualizamos el estado local con la nueva data
      setSports(prevSports => prevSports.map((sport) =>
        sport.id === id
          ? updatedSportResponse 
          : sport
      ));

      setShowEditModal(false);
      setSelectedSport(null);
      setGlobalError(null);

    } catch (err) {
      setGlobalError(err.message || "Error al actualizar el deporte.");
    }
  };

  // 11. Función! Eliminar Deporte
  const handleDeleteSport = async (id) => {
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este deporte? Esta acción es permanente.");
      if (confirmDelete) {
          try {
              await apiService.deleteItem('deportes', id);
              
              // Actualizamos el estado local filtrando el deporte eliminado
              setSports(sports.filter((sport) => sport.id !== id));
              setGlobalError(null);

          } catch (err) {
              setGlobalError(err.message || "Error al eliminar el deporte. (Puede tener miembros inscritos).");
          }
      }
  };


  // 12. Funciones de cerrar modal (Sin cambios)
  const handleCloseEditModal = () => { setShowEditModal(false);
    setSelectedSport(null); };
  const handleCloseViewModal = () => { setShowViewModal(false);
    setSelectedSport(null); 
    setEnrolledMembers([]); // Limpiamos la lista al cerrar
    setViewLoading(false);
  };
  const handleCloseAddModal = () => { setShowAddModal(false); };

  // 13. Abrir modal de agregar
  const handleOpenAddModal = () => {
    setAddForm({
      nombre: "",
      estado: "Activo",
    });
    setShowAddModal(true);
  };
  
  // 14. Guardar nuevo deporte
  const handleSaveAdd = async () => {
    if (!addForm.nombre.trim()) {
      alert("El nombre del deporte es requerido");
      return;
    }
    
    try {
      const newSportData = {
        nombre: addForm.nombre,
        estado: addForm.estado,
      };
      
      const createdSport = await apiService.createItem('deportes', newSportData);
      
      const updatedSports = [...sports, createdSport];
      setSports(updatedSports);
      setShowAddModal(false);
      setGlobalError(null);

    } catch (err) {
      setGlobalError(err.message || "Error al crear el deporte.");
    }
  };

  // (El Badge de estado y filtros se mantienen igual)
  const getStatusBadge = (estado) => { 
    switch (estado) {
        case "Activo": return <Badge bg="success">Activo</Badge>;
        case "Inactivo": return <Badge bg="danger">Inactivo</Badge>;
        default: return <Badge bg="secondary">{estado}</Badge>;
    }
  };
  
  const filters = [ ];

  // 15. Definir columnas
  const columns = [
    { key: "nombre", label: "Nombre del Deporte" },
    {
      key: "miembros",
      label: "Miembros", 
      render: (item) => {
        const miembros = item.miembros || 0;
        return <span className="member-count">{miembros}</span>;
      },
    },
    { key: "estado", label: "Estado", render: (item) => getStatusBadge(item.estado) },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="action-buttons-inline">
          <Button variant="link" onClick={() => handleEdit(item.id)}>Editar</Button>
          <Button variant="link" onClick={() => handleView(item.id)}>Ver</Button>
          <Button variant="link" onClick={() => handleDeleteSport(item.id)} className="text-danger">Eliminar</Button>
          
          {item.estado === "Activo" ? (
            <Button variant="link" className="deactivate-btn" onClick={() => handleToggleEstado(item.id, 'Inactivo')}>
              Desactivar
            </Button>
          ) : (
            <Button variant="link" className="activate-btn" onClick={() => handleToggleEstado(item.id, 'Activo')}>
              Activar
            </Button>
          )}
        </div>
      ),
    },
  ];


  return (
    <div className="sports-table-container">
      {/* 16. DATATABLE */}
      <DataTable
        data={sports}
        columns={columns}
        searchable={true}
        searchPlaceholder="Buscar por nombre de deporte"
        filters={filters}
        selectable={false}
      /> 

      {/* MODAL DE EDICIÓN */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton><Modal.Title>Editar Deporte</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
              <Form.Control type="text" value={editForm.nombre} onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })} />
            </Form.Group>
            
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

      {/* MODAL DE AGREGAR */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton><Modal.Title>Agregar Nuevo Deporte</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Deporte</Form.Label>
              <Form.Control type="text" value={addForm.nombre} onChange={(e) => setAddForm({ ...addForm, nombre: e.target.value })} />
            </Form.Group>

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

       <Modal show={showViewModal} onHide={handleCloseViewModal} centered size="lg">
          <Modal.Header closeButton>
              <Modal.Title>Inscritos en: {selectedSport?.nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {viewLoading ? (
                  <div className="text-center"><Spinner animation="border" /></div>
              ) : enrolledMembers.length === 0 ? (
                  <Alert variant="info">No hay socios inscritos en {selectedSport?.nombre}.</Alert>
              ) : (
                  <Table striped bordered hover size="sm">
                      <thead>
                          <tr>
                              <th>Nombre</th>
                              <th>DNI</th>
                              <th>Email</th>
                          </tr>
                      </thead>
                      <tbody>
                          {enrolledMembers.map((member, index) => (
                              <tr key={member.dni || index}>
                                  <td>{member.nombre}</td>
                                  <td>{member.dni}</td>
                                  <td>{member.email}</td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              )}
          </Modal.Body>
        </Modal>
    </div>
  );
});

SportsTable.displayName = "SportsTable";
export default SportsTable;