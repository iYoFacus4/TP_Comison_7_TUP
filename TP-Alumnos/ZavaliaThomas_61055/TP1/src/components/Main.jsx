import React from 'react';
import Hero from './Hero';         
import About from './AcercaDeMi';
import Estudios from './Estudios';
import Skills from './SoftSkills';      
import Proyectos from './Proyectos';
import Idiomas from './Idiomas';

function Main() {
  return (
 
    <main className="main-content">
      <Hero /> 
      <About />
      <Estudios />
      <Skills />
      <Proyectos />
      <Idiomas />
    </main>
  );
}

export default Main;