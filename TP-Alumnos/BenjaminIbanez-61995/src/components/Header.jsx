export default function Header() {
  return (
    <>
      <nav className="topbar">
        <a href="#proyectos">Proyectos</a>
        <a href="#estudios">Estudios</a>
        <a href="#idiomas">Idiomas</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#softskills">Soft Skills</a>
        <a href="#certificados">Certificados</a>
      </nav>

      <header className="header">
        <div className="hero">
          <img src="../public/profile.jpg" alt="Foto de perfil" className="avatar" />
          <div>
            <h1>Ibañez Lucas Benjamin</h1>
            <p>Desarrollador Web JR</p>
            <a className="btn" href="mailto:tucorreo@dominio.com">Contactarme</a>
          </div>
        </div>
      </header>
    </>
  );
}
