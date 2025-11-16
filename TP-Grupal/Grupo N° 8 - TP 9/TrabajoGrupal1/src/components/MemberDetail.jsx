import { useState, useEffect } from "react";
import { Form, Button, Nav } from "react-bootstrap";
import "./MemberDetail.css";

const MemberDetail = ({ member, onUpdateMember, onDeleteMember }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...member });

  // Actualizar formData cuando cambie el miembro seleccionado
  useEffect(() => {
    setFormData({ ...member });
    setIsEditing(false);
    setActiveTab("personal");
  }, [member]);

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
    const currentSports = formData.associatedSports || [];
    const newSports = currentSports.includes(sport)
      ? currentSports.filter((s) => s !== sport)
      : [...currentSports, sport];

    setFormData((prev) => ({
      ...prev,
      associatedSports: newSports,
    }));
  };

  // Guardar cambios
  const handleSaveChanges = () => {
    onUpdateMember(formData);
    setIsEditing(false);
  };

  // Cancelar edición
  const handleCancel = () => {
    setFormData({ ...member });
    setIsEditing(false);
  };

  // Eliminar miembro
  const handleDelete = () => {
    onDeleteMember(member.id);
  };

  // Cambiar avatar (simulado)
  const handleChangeAvatar = () => {
    const newAvatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
    setFormData((prev) => ({
      ...prev,
      avatar: newAvatar,
    }));
  };

  const availableSports = ["Fútbol", "Tenis", "Básquetbol", "Natación", "Vóleibol"];

  return (
    <div className="member-detail-container">
      {/* Header con avatar y botones */}
      <div className="member-header">
        <div className="member-header-left">
          <div className="avatar-wrapper">
            <img
              src={formData.avatar}
              alt={formData.fullName}
              className="member-detail-avatar"
            />
            {isEditing && (
              <button
                className="change-avatar-btn"
                onClick={handleChangeAvatar}
                title="Cambiar foto"
              >
                <i className="bi bi-camera-fill"></i>
              </button>
            )}
          </div>
          <div className="member-header-info">
            <h2 className="member-detail-name">{formData.fullName}</h2>
            <p className="member-since">Miembro desde: {member.memberSince}</p>
          </div>
        </div>
        <div className="member-header-actions">
          {!isEditing ? (
            <>
              <Button
                variant="outline-primary"
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </Button>
              <Button
                variant="outline-danger"
                className="delete-btn"
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {/* Tabs de navegación */}
      <Nav variant="tabs" className="member-tabs">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
          >
            Datos Personales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "sports"}
            onClick={() => setActiveTab("sports")}
          >
            Deportes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "payment"}
            onClick={() => setActiveTab("payment")}
          >
            Historial de Pagos
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Contenido de las tabs */}
      <div className="tab-content">
        {activeTab === "personal" && (
          <div className="personal-details-tab">
            <div className="form-row">
              <div className="form-group-member">
                <label>Nombre Completo</label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="member-input"
                />
              </div>
              <div className="form-group-member">
                <label>Correo Electrónico</label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="member-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-member">
                <label>Número de Teléfono</label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="member-input"
                />
              </div>
              <div className="form-group-member">
                <label>Fecha de Nacimiento</label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="member-input"
                />
              </div>
            </div>

            {/* Associated Sports Section */}
            <div className="sports-section">
              <label className="sports-label">Deportes Asociados</label>
              <div className="sports-checkboxes">
                {availableSports.map((sport) => (
                  <div
                    key={sport}
                    className={`sport-checkbox-card ${
                      formData.associatedSports?.includes(sport) ? "checked" : ""
                    }`}
                  >
                    <Form.Check
                      type="checkbox"
                      id={`sport-${sport}`}
                      label={sport}
                      checked={formData.associatedSports?.includes(sport)}
                      onChange={() => handleSportChange(sport)}
                      disabled={!isEditing}
                      className="sport-checkbox"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sports" && (
          <div className="sports-tab">
            <p className="coming-soon">Información de deportes próximamente...</p>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="payment-tab">
            <p className="coming-soon">Historial de pagos próximamente...</p>
          </div>
        )}
      </div>

      {/* Botones de acción al editar */}
      {isEditing && (
        <div className="form-actions">
          <Button variant="secondary" className="cancel-btn" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" className="save-btn" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;
