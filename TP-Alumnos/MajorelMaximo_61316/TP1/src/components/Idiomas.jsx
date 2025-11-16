import React from "react";
import "../styles/Idiomas/idioma.css";
export const Idiomas = () => {
  const idiomas = [
    {
      nombre: "Español",
      nivel: "Nativo",
      descripcion: "Lengua materna",
    },
    {
      nombre: "Ingles",
      nivel: "B2",
      descripcion: "Intermedio-Avanzado",
    },
  ];

  return (
    <>
      <section className="idioma-container" id="idiomas">
        <div className="section-header">
          <h2 className="idioma-title">Idiomas que domino</h2>
          <p className="section-subtitle">Competencias lingüísticas</p>
        </div>
        <ul className="idioma-list">
          {idiomas.map((idioma, index) => (
            <li key={index} className="idioma-card">
              <div className="idioma-info">
                <h3 className="idioma-nombre">{idioma.nombre}</h3>
                <span className="idioma-nivel">{idioma.nivel}</span>
                <p className="idioma-descripcion">{idioma.descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
