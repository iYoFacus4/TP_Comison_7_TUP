export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Lucas Benjamin Ibañez</p>
      <nav>
        <a href="#proyectos">Proyectos</a>
        <a href="#estudios">Estudios</a>
        <a href="#softskills">Soft Skills</a>
      </nav>
    </footer>
  );
}
