import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: 16 }}>
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe.</p>
    <p>
      <Link to="/">Volver al inicio</Link>
    </p>
  </div>
);

export default NotFound;
