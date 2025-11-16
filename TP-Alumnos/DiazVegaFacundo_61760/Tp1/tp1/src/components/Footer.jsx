import { personalData } from "../data/data";

const Footer = () => {
  return (
    <footer className="portfolio-footer">
      <p>&copy; {new Date().getFullYear()} {personalData.nombre}. Todos los derechos reservados.</p>
      <div className="social-links">
        <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={personalData.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;