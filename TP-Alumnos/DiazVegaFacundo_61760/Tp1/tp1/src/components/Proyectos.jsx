import { proyectosData } from "../data/data";

const Proyectos = () => {
  return (
    <section id="proyectos" className="section-padding">
      <h2 className="section-title">Proyectos Realizados</h2>
      <div className="proyectos-grid">
        {proyectosData.map((proyecto) => (
          <div key={proyecto.id} className="proyecto-card">
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
            <div className="tecnologias">
              {proyecto.tecnologias.map((tec, index) => (
                <span key={index} className="badge">
                  {tec}
                </span>
              ))}
            </div>
            <a href={proyecto.link} target="_blank" rel="noopener noreferrer" className="repo-link">
              Ver Repositorio
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;