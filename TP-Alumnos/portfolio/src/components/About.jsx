import React from 'react';
import './styles/About.css';

const About = () => {
  return (
    <section id="sobre-mi" className="about">
      <div className="container">
        <h2 className="section-title">Sobre mí</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="profile-placeholder">
              <span>👨‍💻</span>
            </div>
          </div>
          <div className="about-text">
            <h3>Joaquín Mansilla</h3>
            <p className="about-description">
              Tengo 20 años y soy de <strong>Tucumán, Argentina</strong>. Actualmente estoy estudiando en la <strong>Facultad Tecnológica Nacional</strong>. 
              Me apasiona el desarrollo de software y la creación de aplicaciones web modernas.
            </p>
            <p className="about-description">
              Mi objetivo es seguir aprendiendo y creciendo como desarrollador, 
              aplicando las mejores prácticas y tecnologías actuales para crear 
              soluciones innovadoras y eficientes.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h4>20</h4>
                <p>Años</p>
              </div>
              <div className="stat">
                <h4>Tucumán</h4>
                <p>Argentina</p>
              </div>
              <div className="stat">
                <h4>UTN</h4>
                <p>Estudiante</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
