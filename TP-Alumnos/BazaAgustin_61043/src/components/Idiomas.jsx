import React from "react";
import "../styles/Idiomas.css";

export default function Idiomas() {
  const idiomas = [
    { id: 1, nombre: "Español", nivel: "Nativo" },
    { id: 2, nombre: "Inglés", nivel: "Intermedio" }
  ];

  return (
    <section id="idiomas" className="idiomas-section">
      <h2 className="section-title">Idiomas</h2>
      <div className="idiomas-grid">
        {idiomas.map((idioma) => (
          <div key={idioma.id} className="idioma-card">
            <p className="idioma-text">
              {idioma.nombre} <span className="idioma-level">({idioma.nivel})</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
