import React from "react";
import "../styles/SoftSkills/softskills.css";
export const SoftSkills = () => {
  const textColor = {
    claro: "#cad3f5",
    oscuro: "#181926",
  };
  const habilidades = [
    {
      nombre: "Comunicación",
      background: "#8bd5ca",
      textColor: textColor.oscuro,
      icon: "💬",
    },
    {
      nombre: "Aprendizaje Rápido",
      background: "#a6da95",
      textColor: textColor.oscuro,
      icon: "🚀",
    },
    {
      nombre: "Liderazgo",
      background: "#8aadf4",
      textColor: textColor.oscuro,
      icon: "👥",
    },
    {
      nombre: "Proactivo",
      background: "#f5a97f",
      textColor: textColor.oscuro,
      icon: "⚡",
    },
    {
      nombre: "Trabajo en equipo",
      background: "#8bd5ca",
      textColor: textColor.oscuro,
      icon: "🤝",
    },
  ];
  return (
    <>
      <section className="softSkills-container" id="softskills">
        <div className="title-container">
          <h2>Soft Skills</h2>
          <p className="skills-subtitle">
            Habilidades interpersonales y de gestión
          </p>
        </div>
        <div className="skill-container">
          <ul className="skills-grid">
            {habilidades.map((habilidad, index) => (
              <li
                key={index}
                className="skill-card"
                style={{ backgroundColor: habilidad.background }}
              >
                <div className="skill-icon">{habilidad.icon}</div>
                <div className="skill-content">
                  <h3
                    className="skill-name"
                    style={{ color: habilidad.textColor }}
                  >
                    {habilidad.nombre}
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
