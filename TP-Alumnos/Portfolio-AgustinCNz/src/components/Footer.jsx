// Footer.jsx
// Footer minimalista con navegación secundaria y redes.
// Se reacomoda con flex-wrap en pantallas chicas.

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-row">
        {/* Marca y contexto */}
        <div>
          © {year} <strong>Agustín Correa</strong>
          <span className="dot">•</span>
          Portfolio – Programación 4
        </div>

        {/* Links de salto a secciones */}
        <div className="links">
          <a href="#inicio">Inicio</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#certificados">Certificados</a>
          <a href="#contacto">Contacto</a>
        </div>

        {/* Redes (GitHub + LinkedIn) */}
        <div className="links">
          <a href="https://github.com/AgustinCNz" target="_blank" rel="noreferrer" title="GitHub">
            <FaGithub size={18} />
          </a>
          <a
            href="www.linkedin.com/in/luis-agustin-correa-nuñez/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
