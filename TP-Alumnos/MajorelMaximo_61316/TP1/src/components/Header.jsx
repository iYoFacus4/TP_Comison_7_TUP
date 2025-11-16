import React from "react";
import "../styles/Header/header.css";
import fotoMaxi from "../assets/Header/fotoMaxi.png";
export const Header = () => {
  return (
    <>
      <header className="header-wrapper" id="inicio">
        <section className="header-container">
          <div className="photo-container">
            <img src={fotoMaxi} alt="Fotografía Máximo Majorel" />
          </div>
          <div className="header-info">
            <h1 className="header-name">Máximo Majorel</h1>
            <p className="header-title">
              Full Stack Developer & Product Manager
            </p>
            <nav className="header-nav" aria-label="Navegación principal">
              <ul className="nav-list">
                <li>
                  <a className="nav-link" href="#inicio">
                    Inicio
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#estudios">
                    Estudios
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#experiencia">
                    Experiencia
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#proyectos">
                    Proyectos
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#softskills">
                    Soft Skills
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#idiomas">
                    Idiomas
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#certificados">
                    Certificados
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#contacto">
                    Contacto
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </header>
    </>
  );
};
