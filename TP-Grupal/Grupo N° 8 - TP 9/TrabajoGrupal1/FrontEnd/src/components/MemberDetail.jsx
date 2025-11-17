<<<<<<< HEAD
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
=======
// FrontEnd/src/components/MemberDetail.jsx (CÓDIGO COMPLETO)
import { useState, useEffect } from "react";
import { Form, Button, Nav, Spinner } from "react-bootstrap";
import "./MemberDetail.css";

// 1. Importamos el apiService
import apiService from "../services/apiService"; 

// 2. Función para formatear fecha 'YYYY-MM-DD'
const formatISODate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    return ''; 
  }
};

const MemberDetail = ({ member, onUpdateMember, onDeleteMember }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...member });
  
  const [availableSports, setAvailableSports] = useState([]); 
  const [selectedSportIds, setSelectedSportIds] = useState([]); 
  const [isLoadingSports, setIsLoadingSports] = useState(false);

  // 3. useEffect MODIFICADO: Carga datos del socio Y sus deportes
  useEffect(() => {
    setFormData({ 
      ...member,
      fecha_nacimiento: formatISODate(member.fecha_nacimiento)
    });
    setIsEditing(false);
    setActiveTab("personal");
>>>>>>> main

    const loadSportsData = async () => {
      if (!member || !member.id) return; // Asegurarse de que 'member' exista
      
      setIsLoadingSports(true);
      try {
        const [allSportsData, socioSportsData] = await Promise.all([
          apiService.getAll('deportes?estado=Activo'), 
          apiService.getAll(`socios/${member.id}/deportes`) 
        ]);
        
        setAvailableSports(allSportsData); 
        setSelectedSportIds(socioSportsData); 

      } catch (err) {
        console.error("Error al cargar deportes: ", err);
      } finally {
        setIsLoadingSports(false);
      }
    };

    loadSportsData();
  }, [member]); // Se ejecuta cada vez que 'member' cambia

  // 4. Manejadores de cambios
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
  };

<<<<<<< HEAD
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
=======
  const handleSportChange = (sportId) => {
    setSelectedSportIds((prevIds) => 
      prevIds.includes(sportId)
        ? prevIds.filter((id) => id !== sportId) // Lo quita
        : [...prevIds, sportId] // Lo agrega
    );
>>>>>>> main
  };
  
  // =========================================================
  // FUNCIONES DE API (CRUD)
  // =========================================================

<<<<<<< HEAD
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
=======
  // 5. Manejadores de acciones
  const handleSaveChanges = () => {
    const dataParaEnviar = {
      ...formData,
      associatedSports: selectedSportIds 
    };
    onUpdateMember(dataParaEnviar);
    setIsEditing(false);
  };

  const handleCancel = () => {
     setFormData({ 
      ...member,
      fecha_nacimiento: formatISODate(member.fecha_nacimiento)
    });
    setIsEditing(false);
>>>>>>> main
  };
  
  const handleDelete = () => onDeleteMember(member.id);

<<<<<<< HEAD
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
=======
  // 6. ¡AQUÍ ESTÁ EL JSX QUE FALTABA!
  return (
    <div className="member-detail-container">
      {/* --- HEADER (FALTABA) --- */}
      <div className="member-header">
        <div className="member-header-left">
          <div className="avatar-wrapper">
             <div className="member-avatar-placeholder large">
               <i className="bi bi-person-fill"></i>
             </div>
          </div>
          <div className="member-header-info">
            <h2 className="member-detail-name">{formData.nombre}</h2>
            <p className="member-since">Miembro desde: {new Date(member.fecha_alta).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="member-header-actions">
          {!isEditing ? (
            <>
              <Button variant="outline-primary" className="edit-btn" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <Button variant="outline-danger" className="delete-btn" onClick={handleDelete}>
                Eliminar
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {/* --- TABS (FALTABAN) --- */}
      <Nav variant="tabs" className="member-tabs">
        <Nav.Item>
          <Nav.Link active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
            Datos Personales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "payment"} onClick={() => setActiveTab("payment")}>
            Historial de Pagos
>>>>>>> main
          </Nav.Link>
        </Nav.Item>
      </Nav>

<<<<<<< HEAD
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
=======
      {/* --- CONTENIDO DE TABS (FALTABA) --- */}
      <div className="tab-content">
        {activeTab === "personal" && (
          <div className="personal-details-tab">
            
            {/* --- CAMPOS DE DATOS PERSONALES (FALTABAN) --- */}
            <div className="form-row">
              <div className="form-group-member">
                <label>Nombre Completo</label>
                <Form.Control type="text" name="nombre" value={formData.nombre || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
              <div className="form-group-member">
                <label>DNI</label>
                <Form.Control type="text" name="dni" value={formData.dni || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group-member">
                <label>Correo Electrónico</label>
                <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
              <div className="form-group-member">
                <label>Número de Teléfono</label>
                <Form.Control type="text" name="telefono" value={formData.telefono || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group-member">
                <label>Fecha de Nacimiento</label>
                <Form.Control type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
            </div>

            {/* --- SECCIÓN DE DEPORTES (Esto era lo único que veías) --- */}
            <div className="sports-section">
              <label className="sports-label">Deportes Asociados</label>
              <div className="sports-checkboxes">
                {isLoadingSports ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  availableSports.map((sport) => (
                    <div
                      key={sport.id}
                      className={`sport-checkbox-card ${
                        selectedSportIds.includes(sport.id) ? "checked" : ""
                      }`}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`sport-${sport.id}`}
                        label={sport.nombre} 
                        checked={selectedSportIds.includes(sport.id)}
                        onChange={() => handleSportChange(sport.id)}
                        disabled={!isEditing}
                        className="sport-checkbox"
                      />
                    </div>
                  ))
                )}
>>>>>>> main
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

<<<<<<< HEAD
      {/* Botones de acción al editar/crear */}
      {(isEditing || isNewMember) && (
=======
      {/* --- BOTONES DE GUARDAR (FALTABAN) --- */}
      {isEditing && (
>>>>>>> main
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