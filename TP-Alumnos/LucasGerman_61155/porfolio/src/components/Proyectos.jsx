import "../styles/Proyectos.css";



export default function Proyectos({ id }) {
    
const proyectosData = [
  {
    id: 1,
    titulo: 'Tienda de Cómics E-commerce',
    descripcion: 'Una aplicación web de comercio electrónico enfocada en la venta de cómics, desarrollada como proyecto práctico para aplicar conceptos fundamentales de desarrollo front-end.',
    tecnologias: ['React', 'JavaScript', 'CSS', 'Firebase'],
    linkRepo: 'https://github.com/LucasGermann/TiendaComics',
  }
];





  return (
    <section id={id} className="seccion-proyectos">
      <h2 className="h2-proyectos">Proyectos</h2>
      <div className="proyectos-div">
        {proyectosData.map((proyecto) => (
          <article key={proyecto.id} className="proyecto-card">
            <h3>{proyecto.titulo}</h3>
            <p className="proyecto-descripcion">{proyecto.descripcion}</p>
            <div className="tecnologias-container">
              {proyecto.tecnologias.map((tech) => (
                <span key={tech} className="tecnologia-tag">{tech}</span>
              ))}
            </div>
            <a href={proyecto.linkRepo} target="_blank" rel="noopener noreferrer" className="proyecto-boton">
              Ver Repositorio en GitHub
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}