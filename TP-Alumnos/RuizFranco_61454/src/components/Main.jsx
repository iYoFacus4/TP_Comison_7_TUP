import React from 'react';
import Proyectos from './Proyectos'; // Importamos el componente de proyectos
import Estudios from './Estudios';   // Importamos el componente de estudios

const Main = () => {
  return (
    <main>
      <section className="seccion">
        <h2>Sobre Mí</h2>
        <p>
          ¡Hola! Soy un apasionado desarrollador de software con experiencia en...
          (aquí va tu bio).
        </p>
      </section>
      
      {/* Aquí renderizas los componentes de las secciones */}
      <Estudios />
      <Proyectos />
      {/* Agrega las otras secciones aquí... */}
    </main>
  );
};

export default Main;