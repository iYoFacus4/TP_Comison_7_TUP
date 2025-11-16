import React from 'react';

// 1. Recibimos la prop "{ formacion }" que envía Main.jsx
function Estudios({ formacion }) {
  
  return (
    <section id="estudios" className="estudios-seccion"> {/* Asegúrate de que el id sea "estudios" */}
      <h2>Mi Formación 🎓</h2>
      <div className="estudios-contenedor">
        
        {formacion.map( (estudio) => (
          
          <article key={estudio.id} className="estudio-card">
            
            
            <h3>{estudio.titulo}</h3>
            <p className="estudio-institucion">{estudio.institucion}</p>
            <p className="estudio-info">{estudio.periodo} | {estudio.estado}</p>
          
          </article>

        ))}

      </div>
    </section>
  );
}

export default Estudios;