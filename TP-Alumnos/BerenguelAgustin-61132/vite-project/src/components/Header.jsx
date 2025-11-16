import React from 'react';
import '../Style/Header.css';
import MiFoto from '../resources/yo.jpg';

import { HashLink } from 'react-router-hash-link';

const Header = () => {
  return (
    <header className="header">
      <div className='Imagen_y_Titulo'>
        <img src={MiFoto} alt="Yo"/>
        <h1>Berenguel Juan Agustin</h1>
      </div>
      <nav className='navbar'>
        <ul>
          {}
          <li><HashLink smooth to="/#Inicio">Inicio</HashLink></li>          
          {}
          <li><HashLink smooth to="/#estudios">Estudios</HashLink></li>
          <li><HashLink smooth to="/#mis-proyectos">Proyectos</HashLink></li>
          <li><HashLink smooth to="/#softskills">Softskills</HashLink></li>
          <li><HashLink smooth to="/#experiencia">Experiencia</HashLink></li>
          <li><HashLink smooth to="/#Certificados">Certificados</HashLink></li>
          <li><HashLink smooth to="/#Idiomas">Idiomas</HashLink></li>
          <li><HashLink smooth to="/#Contacto">Contacto</HashLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;