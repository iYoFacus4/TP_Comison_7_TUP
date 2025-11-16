
// Hero.jsx
// Presentación principal del portfolio.
// Mobile-first: en pantallas chicas, todo en una columna; en ≥860px, 2 columnas.

import { FaGithub, FaLinkedin } from "react-icons/fa";
import fotoPerfil from "/fotoperfil.png"; // mi imagen local (src/assets/*)

export default function Hero() {
  return (
    <section id="inicio" className="section hero">
      <div>
        {/* Título claro y directo */}
        <h1>Software Engineer Jr — soluciones simples y funcionales</h1>

        {/* Bajada corta (edito texto sin tocar estilos) */}
        <p>
          Experiencia con C#, .NET, React, MySQL y Git/GitHub. Diseño limpio,
          foco en usabilidad y buenas prácticas.
        </p>

        {/* Acciones principales */}
        <div className="actions">
          <a className="btn primary" href="#contacto">Contactarme</a>
          <a className="btn" href="https://github.com/AgustinCNz" target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
          <a className="btn" href="www.linkedin.com/in/luis-agustin-correa-nuñez/" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>

      {/* Imagen: centrada en mobile, derecha en desktop */}
      <img className="hero-img" src={fotoPerfil} alt="Foto de perfil" />
    </section>
  );
}
