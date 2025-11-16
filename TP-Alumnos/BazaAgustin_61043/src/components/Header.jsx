import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import Foto from '../assets/MiFoto.jpg';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-nav-bar">
        <div className="header-logo">
          <h2 className="header-title">AGUSTIN BAZA</h2>
        </div>
        <nav className="header-nav">
          <a href="#estudios">Estudios</a>
          <a href="#soft-skills">Habilidades</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#idiomas">Idiomas</a>
        </nav>
        <div className="header-avatar">
          <div className="avatar">
            <img src={Foto} alt="Agustin Baza" />
          </div>
        </div>
      </div>
    </header>
  );
}
