import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, updateProfile, changePassword, isLoading } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [profileData, setProfileData] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    const result = await updateProfile(profileData);
    
    if (result.success) {
      setMessage({ type: "success", text: "Perfil actualizado exitosamente" });
      setEditMode(false);
    } else {
      setMessage({ type: "danger", text: result.error || "Error al actualizar perfil" });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "danger", text: "Las contraseñas no coinciden" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "danger", text: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }
    
    const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);
    
    if (result.success) {
      setMessage({ type: "success", text: "Contraseña cambiada exitosamente" });
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setMessage({ type: "danger", text: result.error || "Error al cambiar contraseña" });
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="mb-4">Mi Perfil</h2>

          {message.text && (
            <Alert 
              variant={message.type} 
              dismissible 
              onClose={() => setMessage({ type: "", text: "" })}
            >
              {message.text}
            </Alert>
          )}

          {/* Información del perfil */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Información Personal</h5>
              {!editMode && (
                <Button 
                  variant="light" 
                  size="sm" 
                  onClick={() => setEditMode(true)}
                >
                  Editar
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {!editMode ? (
                <>
                  <p><strong>Nombre:</strong> {user?.nombre} {user?.apellido}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Teléfono:</strong> {user?.telefono || "No especificado"}</p>
                  <p><strong>Rol:</strong> <span className="badge bg-info">{user?.role}</span></p>
                </>
              ) : (
                <Form onSubmit={handleProfileSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={profileData.nombre}
                          onChange={handleProfileChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          name="apellido"
                          value={profileData.apellido}
                          onChange={handleProfileChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      name="telefono"
                      value={profileData.telefono}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                      {isLoading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setEditMode(false);
                        setProfileData({
                          nombre: user?.nombre || "",
                          apellido: user?.apellido || "",
                          email: user?.email || "",
                          telefono: user?.telefono || "",
                        });
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>

          {/* Cambiar contraseña */}
          <Card>
            <Card.Header className="bg-warning text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Seguridad</h5>
              {!showPasswordForm && (
                <Button 
                  variant="light" 
                  size="sm" 
                  onClick={() => setShowPasswordForm(true)}
                >
                  Cambiar Contraseña
                </Button>
              )}
            </Card.Header>
            {showPasswordForm && (
              <Card.Body>
                <Form onSubmit={handlePasswordSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña Actual</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Nueva Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                    />
                    <Form.Text className="text-muted">
                      Mínimo 6 caracteres
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="warning" type="submit" disabled={isLoading}>
                      {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
