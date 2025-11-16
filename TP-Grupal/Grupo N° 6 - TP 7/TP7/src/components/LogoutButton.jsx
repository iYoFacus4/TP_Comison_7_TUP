import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();
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