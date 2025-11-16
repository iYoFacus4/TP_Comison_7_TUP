import React from 'react';
import './styles/Hero.css';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            ¡Hola! Soy <span className="highlight">Joaquín Mansilla</span>
          </h1>
          <p className="hero-subtitle">
            Desarrollador Full Stack | Tucumán, Argentina
          </p>
          <p className="hero-description">
            Estudiante de la Facultad Tecnológica Nacional, apasionado por crear soluciones web innovadoras y funcionales
          </p>
          <div className="hero-buttons">
            <a href="#habilidades" className="btn btn-primary">Ver habilidades</a>
            <a href="#contacto" className="btn btn-secondary">Contactar</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="code-animation">
            <div className="code-line"></div>
            <div className="code-line"></div>
            <div className="code-line"></div>
            <div className="code-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
