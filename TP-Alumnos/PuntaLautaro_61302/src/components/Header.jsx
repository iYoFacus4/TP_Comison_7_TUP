import perfil from "../assets/perfil.png";
export default function Header() {
  return (
    <header className="header">
      <div className="hero">
    <img
        src={perfil}
        alt="Foto de Lautaro Punta"
        className="avatar"
    />
        <h1>Lautaro Punta</h1>
        <p className="subtitle">Estudiante de Programación - UTN FRT</p>
      </div>

      <nav className="nav">
        <a href="#estudios">Estudios</a>
        <a href="#softskills">Soft Skills</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#idiomas">Idiomas</a>
        <a href="#certificados">Certificados</a>
      </nav>
    </header>
  );
}
