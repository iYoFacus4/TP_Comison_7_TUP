// TP7/src/components/LogoutButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const LogoutButton = () => {
  const logout = useAuthStore(s => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button
      variant="outline-danger"
      onClick={handleLogout}
      className="d-flex align-items-center gap-2"
    >
      <i className="fas fa-sign-out-alt"></i>
      Cerrar Sesión
    </Button>
  );
};

export default LogoutButton;
