import foto from "../assets/foto-mateo.jpg";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav-links">
        <a href="#estudios">Estudios</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#idiomas">Idiomas</a>
        <a href="#certificados">Certificados</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <img src={foto} alt="Avila Mateo" className="profile-pic" />

      <h1 className="nombre">Avila Mateo</h1>

      <p className="bio">
        Programador full stack, siempre con ganas de aprender y mejorar día a
        día. Fan del básquet y del código limpio.
      </p>

      <div className="social-links">
        <a href="https://github.com/mateoavila10" target="_blank" rel="noreferrer" className="btn-github">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mateo-avila-59932b345/"
          target="_blank"
          rel="noreferrer"
          className="btn-linkedin"
        >
          LinkedIn
        </a>
      </div>
    </header>
  );
}
