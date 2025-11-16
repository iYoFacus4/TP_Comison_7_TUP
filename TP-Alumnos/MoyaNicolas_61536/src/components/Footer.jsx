import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>📧 Email: moyanico044@gmail.com</p>
          <p>📱 Teléfono: +54 381 573 7316</p>
          <p>📍 Tucumán, Argentina</p>
        </div>

        <div className="footer-section">
          <h3>Sobre este sitio</h3>
          <p>Portfolio personal desarrollado con React</p>
          <p>© 2025 Nicolás Moya. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
