import { personalData } from "../data/data";
import profileImage from '../assets/foto.jpg'; 

const Header = () => {
  return (
    <header className="portfolio-header">
      <img
        src={profileImage}
        alt="Foto de perfil de Facundo Díaz Vega"
        className="profile-picture"
      />
      <h1>{personalData.nombre}</h1>
      <p className="subtitle">{personalData.rol}</p>
    </header>
  );
};

// **LÍNEA CRÍTICA:** Debe ser un export default.
export default Header;