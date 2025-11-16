// src/Components/Navbar.jsx
import React from 'react';
import '../Styles/App.css';

// Recibe la función de cambiar sección como prop
const Navbar = ({ onCambiarSeccion }) => {
    return (
        <nav className="main-navbar">
            <div className="navbar-logo">
                {/* Al hacer clic en el logo, vuelve a la Presentación ('bio') */}
                <a href="#" onClick={() => onCambiarSeccion('bio')}>Luciana Paz</a>
            </div>
            <ul className="navbar-links">
                {/* 1. Inicio (Presentación) */}
                <li><a href="#" onClick={() => onCambiarSeccion('bio')}>Inicio</a></li>
                
                {/* 2. Mi Perfil (Presentación) 
                <li><a href="#" onClick={() => onCambiarSeccion('bio')}>Mi Perfil</a></li> */}
                
                {/* 3. Contáctame */}
                <li><a href="#" onClick={() => onCambiarSeccion('contacto')}>Contáctame</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;