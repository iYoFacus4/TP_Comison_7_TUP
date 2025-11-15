
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RouterProtect({ children }) {
  const isLogged = localStorage.getItem('isLogged') === 'true';
  const location = useLocation();

  if (!isLogged) {
    
    return <Navigate to="/" state={{ from: location }} replace />;
  }

 
  return children;
}