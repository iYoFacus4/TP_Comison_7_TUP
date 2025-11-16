export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Lautaro Punta</p>
      <ul className="social">
        <li>
          <a href="https://www.linkedin.com/in/lautaropunta" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/puntalauta" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
}
