import React from "react";
import "../styles/Estudios/estudios.css";
export const Estudios = () => {
  const estudios = [
    {
      titulo: "Tecnicatura Universitaria en Programación",
      lugar: "UTN",
      año: "2024-Actualidad",
      tipo: "Universidad",
      estado: "En curso",
    },
    {
      titulo: "Rolling Code Full Stack Developer",
      lugar: "Rolling Code School",
      año: "2022-2023",
      tipo: "Bootcamp",
      estado: "Completado",
    },
    {
      titulo: "Técnico Universitario en Fotografía",
      lugar: "Universidad Nacional de Tucumán",
      año: "2020-2023",
      tipo: "Universidad",
      estado: "Completado",
    },
  ];
  return (
    <>
      <section className="estudios-container" id="estudios">
        <div className="section-header">
          <h2 className="estudios-title">Formación Académica</h2>
          <p className="section-subtitle">
            Mi trayectoria educativa y desarrollo profesional
          </p>
        </div>
        <div className="estudios-wrapper">
          <ul className="estudios-list">
            {estudios.map((estudio, index) => (
              <li key={index} className="estudio-item">
                <div className="estudio-card">
                  <div className="estudio-card-header">
                    <h3 className="estudio-titulo">{estudio.titulo}</h3>
                  </div>
                  <div className="estudio-meta">
                    <span className="meta-item">
                      <span className="meta-label">Lugar:</span>
                      {estudio.lugar}
                    </span>
                    <span className="meta-item">
                      <span className="meta-label">Año:</span>
                      {estudio.año}
                    </span>
                    <span className="meta-item">
                      <span className="meta-label">Tipo:</span>
                      {estudio.tipo}
                    </span>
                  </div>
                  <hr className="estudio-divider" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
