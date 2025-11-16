import React from 'react'; 

function Proyectos({ proyectos })
{
    return (
    <section id = "proyectos" className = "seccion">
        <h2> Proyectos Realizados </h2>
        <div className = "proyectos-lista">

            {proyectos.map( (proyecto) => (
            
            <article key={proyecto.id} className="proyecto-card">
                
                <h3>{proyecto.titulo}</h3>

                <p>{proyecto.descripcion}</p>

                <a 
                  href={proyecto.urlGithub} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="proyecto-boton"
                >
                  Ver en GitHub
                </a>
            </article>
            ))}

        </div>        
    </section>
    );
}

export default Proyectos;