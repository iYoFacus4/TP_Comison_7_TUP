import React from 'react';
import './styles/Footer.css';
import { FaGithub, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Joaquín Mansilla</h3>
            <p>Desarrollador Full Stack | Estudiante UTN | Tucumán, Argentina</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces rápidos</h4>
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#sobre-mi">Sobre mí</a></li>
              <li><a href="#habilidades">Habilidades</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>GitHub</h4>
            <div className="footer-social">
              <a href="https://github.com/Joaamansilla" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Hecho con <FaHeart className="heart-icon" /> por Joaquín Mansilla | {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
