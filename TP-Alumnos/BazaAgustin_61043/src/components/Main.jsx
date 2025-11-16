import React from 'react';
import '../styles/Main.css';
import Banner from './Banner';
import Estudios from './Estudios';
import SoftSkills from './SoftSkills';
import Proyectos from './Proyectos';
import Experiencia from './Experiencia';
import Idiomas from './Idiomas';

export default function Main() {
  return (
    <main className="main-container">
      <div className="main-content">
        <Banner />
        <div className="sections-grid">
          <Estudios />
          <SoftSkills />
          <Proyectos />
          <Experiencia />
          <Idiomas />
        </div>
      </div>
    </main>
  );
}
