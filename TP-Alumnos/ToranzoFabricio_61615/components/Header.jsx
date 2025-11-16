import { useState } from "react";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <header className="header">
      <button className="menu-btn" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`nav ${menuAbierto ? "show" : ""}`}>
        <a href="#estudios">Estudios</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#lenguajes">Lenguajes</a>
        <a href="#softskills">Habilidades</a>
        <a href="#idiomas">Idiomas</a>
      </nav>
    </header>
  );
}
