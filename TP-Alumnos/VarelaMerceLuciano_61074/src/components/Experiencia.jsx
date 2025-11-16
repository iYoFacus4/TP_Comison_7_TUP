import React from 'react';

function Experiencia({ experiencia }) {
  
  return (
    <section id="experiencia" className="seccion">
      <h2>Experiencia Laboral</h2>
      <div className="experiencia-contenedor">
        
        {experiencia.map( (job) => (
          
          <article key={job.id} className="experiencia-card">
            <h3>{job.puesto}</h3>
            <p className="experiencia-empresa">{job.empresa}</p>
            <p className="experiencia-periodo">{job.periodo}</p>
            <ul>
              {job.tareas.map( (tarea, index) => (
                <li key={index}>{tarea}</li>
              ))}
            </ul>
          </article>

        ))}

      </div>
    </section>
  );
}

export default Experiencia;