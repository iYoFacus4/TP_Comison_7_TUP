import React from "react";
import "../styles/SoftSkills.css";

export default function SoftSkills() {
  const skills = [
    "Resolución de problemas",
    "Comunicación efectiva",
    "Trabajo en equipo",
    "Adaptabilidad",
    "Gestión del tiempo",
  ];
  
  return (
    <section id="soft-skills" className="soft-skills-section">
      <h2 className="section-title">Habilidades</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <p className="skill-name">{skill}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
