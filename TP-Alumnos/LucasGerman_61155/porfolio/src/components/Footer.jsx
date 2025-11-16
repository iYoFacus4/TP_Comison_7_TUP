import '../styles/Footer.css';


import githubLogo from '../assets/github-logo.png';
import gmailLogo from '../assets/gmail-logo.png';

export default function Footer() {
  return (
    <footer className="footer-principal">
      <div className="footer-container">
        <p className="footer-texto">&copy; {new Date().getFullYear()} Todos los derechos reservados</p>
        <div className="footer-links">

          {/* Enlace de GitHub con la imagen importada */}
          <a href="https://github.com/LucasGermann" target="_blank" rel="noopener noreferrer" title="GitHub">
            <img src={githubLogo} alt="Logo de GitHub" className="icon" />
          </a>

          {/* Enlace de Gmail con la imagen importada */}
          <a href="mailto:lucas00german@gmail.com" title="Enviar correo electrónico">
            <img src={gmailLogo} alt="Logo de Gmail" className="icon" />
          </a>
          
        </div>
      </div>
    </footer>
  );
}