import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>Mi Portfolio</h2>
        </div>

        <div className="header-nav">
          <a href="#footer" className="contact-header-btn">
            Contacto
          </a>
          <div className="social-links">
            <a href="https://github.com/Niconeta" target="_blank" rel="noopener noreferrer" className="social-btn">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nicolásmoya7991" target="_blank" rel="noopener noreferrer" className="social-btn">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;