import React from 'react';
import '../styles/Portfolio.css'; 
import miFoto from '../assets/fotocarnet.jpg';

const Header = () => {
  return (
    <header className="header-portfolio">
      <img src={miFoto} alt="Foto personal" className="foto-personal" />
      <h1>Ruiz Franco Alberto</h1>
    </header>
  );
};

export default Header;