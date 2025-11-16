// src/components/Header.jsx
import React from 'react'; 
import Yo from '../assets/Yo.jpg';
import "../Styles/App.css";

// Recibe las props del Home.jsx
const Header = ({ mostrarSubMenu, toggleSubMenu, onSubMenuClick }) => { 
    return (
        <header className="portfolio-header">
            {/* Columna de Contenido (Izquierda) */}
            <div className="header-content">
                <h3>Hello, My Name Is</h3>
                <h1>Luciana Daniza Paz</h1>
                <p>— Desarrolladora Web Full Stack Junior</p>
                
                {/* Contenedor del Botón y Sub-menú */}
                <div className="cta-menu-container">
                    
                    {/* Botón que ahora toggla la visibilidad del sub-menú */}
                    <button 
                        className="cta-button"
                        onClick={toggleSubMenu} // Llama a la función para alternar
                    >
                        EXPLORAR MI PERFIL
                    </button>

                    {/* SUB-MENÚ INTERACTIVO: Aparece bajo el botón */}
                    {mostrarSubMenu && (
                        <div className="sub-menu-buttons">
                            {/* CLAVE: Cada enlace llama a la función onSubMenuClick con el ID */}
                            <a 
                                href="#bio" 
                                onClick={(e) => onSubMenuClick(e, 'bio')} 
                                className="sub-menu-button"
                            >
                                Presentación
                            </a>
                            <a 
                                href="#estudios" 
                                onClick={(e) => onSubMenuClick(e, 'estudios')} 
                                className="sub-menu-button"
                            >
                                Estudios
                            </a>
                            <a 
                                href="#proyectos" 
                                onClick={(e) => onSubMenuClick(e, 'proyectos')} 
                                className="sub-menu-button"
                            >
                                Proyectos
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Columna de Imagen (Derecha) */}
            <div className="header-image-container">
                <img 
                    src={Yo} 
                    alt="Foto de perfil de Luciana Daniza Paz"
                    className="profile-img"
                    loading="lazy"
                />
            </div>
        </header>
    );
};

export default Header;