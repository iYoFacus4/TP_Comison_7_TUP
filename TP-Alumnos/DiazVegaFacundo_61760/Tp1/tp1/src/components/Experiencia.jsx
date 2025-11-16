import { experienciaData } from "../data/data";

const Experiencia = () => {
  return (
    <section id="experiencia" className="section-padding">
      <h2 className="section-title">Experiencia y Formación Técnica</h2>
      <div className="card-list">
        {experienciaData.map((exp) => (
          <div key={exp.id} className="card">
            <h3>{exp.puesto}</h3>
            <p>
              **Empresa/Curso:** {exp.empresa}
            </p>
            <p>
              **Período:** {exp.periodo}
            </p>
            <p>{exp.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiencia;