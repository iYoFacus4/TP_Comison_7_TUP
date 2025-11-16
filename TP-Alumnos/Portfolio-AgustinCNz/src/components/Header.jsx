// Header.jsx
// Header sticky minimalista con links de anclaje.
// Mobile-first: los links pueden “wrapear”; en pantallas grandes se alinean en una fila.

export default function Header() {
  return (
    <header className="header">
      <div className="container nav">
        {/* Marca personal: cambio el apellido o color desde CSS si lo necesito */}
        <div className="brand">
          Agustín <span>Correa</span>
        </div>

        {/* Navegación interna a secciones del portfolio */}
        <nav className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#certificados">Certificados</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
