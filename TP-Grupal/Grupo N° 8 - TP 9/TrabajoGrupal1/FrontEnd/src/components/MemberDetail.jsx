// /FrontEnd/src/components/MemberDetail/MemberDetail.jsx (VERSIÓN API)

import { useState, useEffect } from "react";
import { Form, Button, Nav, Row, Col } from "react-bootstrap";
import apiService from "../../apiService"; // <-- Importamos la API
import "./MemberDetail.css";

// Estado inicial para un miembro nuevo
const getInitialFormData = () => ({
  id: null, // Si es null, es un nuevo registro
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  // Fecha actual formateada (ej: '15 Nov 2025')
  memberSince: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\./g, ''), 
  avatar: "https://randomuser.me/api/portraits/lego/7.jpg", // Avatar por defecto
  associatedSports: [],
  status: "Activo",
});

// Lista de deportes disponible (tomada de db.json para los checkboxes)
const availableSports = [
  "Tenis", "Natación", "Básquetbol", "Yoga", "Karate", 
  "Fútbol", "Voleibol", "Gimnasia"
];

const MemberDetail = ({ initialMember, onActionCompleted, onCancelEdit }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    initialMember?.id ? { ...initialMember } : getInitialFormData()
  );
  const isNewMember = !initialMember?.id;
  const [loading, setLoading] = useState(false);

  // 1. Efecto para resetear el formulario si cambia el miembro (o si se selecciona "nuevo")
  useEffect(() => {
    setFormData(initialMember?.id ? { ...initialMember } : getInitialFormData());
    setIsEditing(isNewMember); // Empezar editando si es un miembro nuevo
    setActiveTab("personal");
  }, [initialMember, isNewMember]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar cambios en deportes
  const handleSportChange = (sport) => {
    if (!isEditing) return;
    const currentSports = formData.associatedSports || [];
    const newSports = currentSports.includes(sport)
      ? currentSports.filter((s) => s !== sport)
      : [...currentSports, sport];

    setFormData((prev) => ({
      ...prev,
      associatedSports: newSports,
    }));
  };
  
  // =========================================================
  // FUNCIONES DE API (CRUD)
  // =========================================================

  // Manejar Guardar (Creación o Edición)
  const handleSaveChanges = async () => {
    if (!formData.fullName || !formData.email) {
      alert("El nombre completo y el correo electrónico son obligatorios.");
      return;
    }
    setLoading(true);

    try {
      if (isNewMember) {
        // CREACIÓN (POST)
        const { id, ...dataToCreate } = formData;
        await apiService.createItem("members", dataToCreate);
        alert(`Socio "${formData.fullName}" agregado con éxito.`);
      } else {
        // ACTUALIZACIÓN (PATCH)
        await apiService.updateItem("members", formData.id, formData);
        alert(`Socio "${formData.fullName}" actualizado con éxito.`);
      }

      setIsEditing(false);
      onActionCompleted(); // <-- Notificar al padre para recargar la lista
      
    } catch (error) {
      console.error("Error al guardar socio:", error);
      alert(`Error al ${isNewMember ? 'crear' : 'actualizar'} el socio.`);
    } finally {
      setLoading(false);
    }
  };

  // Manejar Eliminación
  const handleDeleteMember = async () => {
    if (isNewMember) return;
    const confirmDelete = window.confirm(
      `¿Está seguro de eliminar al socio: ${formData.fullName}? Esta acción es irreversible.`
    );
    if (!confirmDelete) return;
    setLoading(true);

    try {
      // ELIMINACIÓN (DELETE)
      await apiService.deleteItem("members", formData.id);
      alert(`Socio "${formData.fullName}" eliminado con éxito.`);
      onActionCompleted(); // <-- Notificar al padre para recargar la lista
    } catch (error) {
      console.error("Error al eliminar socio:", error);
      alert("Error al eliminar el socio.");
    } finally {
      setLoading(false);
    }
  };
  
  // Manejar Cancelar Edición/Creación
  const handleCancel = () => {
    if (isNewMember) {
      onCancelEdit(); // Si es un nuevo miembro, indicamos al padre que cierre el detalle/formulario
    } else {
      setFormData({ ...initialMember }); // Restaurar datos originales
      setIsEditing(false); // Volver al modo vista
    }
  };

  // Función para renderizar un campo de Form.Control
  const renderField = (name, label, type = "text", disabled = !isEditing) => (
    <Form.Group as={Col} md="6" className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formData[name] || (type === 'number' ? 0 : '')}
        onChange={handleInputChange}
        disabled={disabled || loading}
      />
    </Form.Group>
  );

  // Mensaje si no hay socio seleccionado (solo en modo vista)
  if (!initialMember && !isNewMember) {
    return (
      <div className="member-detail-container text-center p-5">
        <p className="text-muted">Seleccione un socio de la lista para ver los detalles, o presione "Agregar Nuevo Miembro" para crear uno.</p>
      </div>
    );
  }

  return (
    <div className="member-detail-container">
      {/* Header del miembro */}
      <div className="member-header">
        <div className="member-header-left">
          <div className="avatar-wrapper">
            <img
              src={formData.avatar}
              alt={formData.fullName}
              className="member-detail-avatar"
            />
            {isEditing && (
              <Button
                variant="primary"
                size="sm"
                className="change-avatar-btn"
                onClick={() =>
                  alert(
                    "Funcionalidad para cambiar avatar aún no implementada."
                  )
                }
              >
                <i className="bi bi-camera"></i>
              </Button>
            )}
          </div>
          <div className="member-info">
            <h4 className="member-name-title">
              {isNewMember ? "Nuevo Socio" : formData.fullName}
            </h4>
            <span
              className={`member-status badge bg-${
                formData.status === "Activo" ? "success" : "danger"
              }`}
            >
              {formData.status}
            </span>
          </div>
        </div>
        
        {/* Botones de acción general */}
        {!isEditing && !isNewMember && (
          <div className="action-buttons">
            <Button
              variant="outline-secondary"
              className="delete-member-btn"
              onClick={handleDeleteMember}
              disabled={loading}
            >
              <i className="bi bi-trash me-2"></i>
              Eliminar
            </Button>
            <Button
              variant="primary"
              className="edit-member-btn"
              onClick={() => setIsEditing(true)}
              disabled={loading}
            >
              <i className="bi bi-pencil-square me-2"></i>
              Editar
            </Button>
          </div>
        )}
      </div>

      {/* Navegación de pestañas */}
      <Nav variant="tabs" defaultActiveKey="personal" onSelect={setActiveTab}>
        <Nav.Item>
          <Nav.Link eventKey="personal">Datos Personales</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sports">Deportes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="payment" disabled>
            Pagos (Próximamente)
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Contenido de las pestañas */}
      <div className="member-details-body pt-4">
        {activeTab === "personal" && (
          <Form>
            <Row>
              {renderField("fullName", "Nombre Completo")}
              {renderField("email", "Correo Electrónico", "email")}
              {renderField("phone", "Teléfono")}
              {renderField("dateOfBirth", "Fecha de Nacimiento", "date")}
            </Row>
            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Miembro Desde</Form.Label>
                <Form.Control
                  type="text"
                  name="memberSince"
                  value={formData.memberSince}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={!isEditing || loading}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        )}

        {activeTab === "sports" && (
          <div className="sports-tab">
            <h5 className="mb-3">Deportes Asociados</h5>
            <div className="sports-checkboxes-container">
              <div className="sports-checkboxes">
                {availableSports.map((sport) => (
                  <div
                    key={sport}
                    className={`sport-checkbox-wrapper ${
                      formData.associatedSports?.includes(sport) ? "checked" : ""
                    }`}
                  >
                    <Form.Check
                      type="checkbox"
                      id={`sport-${sport}`}
                      label={sport}
                      checked={formData.associatedSports?.includes(sport)}
                      onChange={() => handleSportChange(sport)}
                      disabled={!isEditing || loading}
                      className="sport-checkbox"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="payment-tab">
            <p className="coming-soon">Historial de pagos próximamente...</p>
          </div>
        )}
      </div>

      {/* Botones de acción al editar/crear */}
      {(isEditing || isNewMember) && (
        <div className="form-actions">
          <Button 
            variant="secondary" 
            className="cancel-btn" 
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            className="save-btn" 
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;