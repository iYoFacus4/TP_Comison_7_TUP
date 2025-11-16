import React from 'react';
import './styles/Header.css';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Joaquín Mansilla</h1>
        </div>
        <nav className="nav">
          <a href="#inicio">Inicio</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className="social-links">
          <a href="https://github.com/Joaamansilla" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
