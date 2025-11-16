import React from 'react';

function Idiomas({ idiomas }) {
  
  return (
    <section id="idiomas" className="seccion">
      <h2>Idiomas</h2>
      <div className="idiomas-contenedor">
        
        {idiomas.map( (idioma) => (
          
          <article key={idioma.id} className="idioma-card">
            <h3>{idioma.nombre}</h3>
            <p>{idioma.nivel}</p>
          </article>

        ))}

      </div>
    </section>
  );
}

export default Idiomas;