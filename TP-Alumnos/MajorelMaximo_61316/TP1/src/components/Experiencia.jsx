import React from "react";
import "../styles/Experiencia/experiencia.css";
export const Experiencia = () => {
  const experiencias = [
    {
      empresa: "Radix",
      cargo: "Founder & Product Manager",
      tipo: "Emprendimiento",
      descripcion:
        "Liderazgo y colaboración con equipos de trabajo en proyectos para múltiples empresas de distintos rubros",
    },
    {
      empresa: "Zymo Tech",
      cargo: "Developer",
      tipo: "Empresa",
      descripcion:
        "Empresa tucumana dedicada a ofrecer soluciones informáticas empresariales",
    },
    {
      empresa: "Hosting Web",
      cargo: "Administrador",
      tipo: "Servicio Propio",
      descripcion:
        "Gestión de servicio de hosting web, administrando proyectos propios y de terceros",
    },
  ];

  return (
    <>
      <section className="experiencia-container" id="experiencia">
        <div className="section-header">
          <h2 className="experiencia-title">Experiencia Profesional</h2>
          <p className="section-subtitle">
            Trayectoria en desarrollo y gestión de proyectos
          </p>
        </div>
        <div className="experiencia-intro">
          <p>
            Gracias a mi emprendimiento <span className="destacado">Radix</span>
            , tuve la oportunidad de liderar y colaborar con equipos de trabajo
            en proyectos para múltiples empresas de distintos rubros. Además,
            actualmente formo parte de{" "}
            <span className="destacado">Zymo Tech</span>, una empresa tucumana
            dedicada a ofrecer soluciones informáticas empresariales.
            Paralelamente, gestiono mi propio{" "}
            <span className="destacado">servicio de hosting web</span>, donde
            administro proyectos tanto propios como de terceros.
          </p>
        </div>
        <div className="experiencia-grid">
          {experiencias.map((exp, index) => (
            <article key={index} className="experiencia-card">
              <div className="card-header">
                <h3 className="card-empresa">{exp.empresa}</h3>
                <span className="card-tipo">{exp.tipo}</span>
              </div>
              <h4 className="card-cargo">{exp.cargo}</h4>
              <p className="card-descripcion">{exp.descripcion}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
