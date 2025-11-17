// frontend/src/MainLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

/**
 * Componente Layout principal.
 * Muestra la barra de navegación y el contenido.
 */
export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
      {/* Menú (como tu sidebar) */}
      <nav style={{ width: '200px', background: '#333', padding: '15px' }}>
        <h3 style={{ color: 'white' }}>Gestor</h3>
        <Link to="/dashboard/eventos" style={{ color: 'white' }}>Eventos</Link>
      </nav>

      {/* El <Outlet> renderiza la página actual (Eventos, Artistas, etc.) */}
      <main style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};