import React from "react";
import "../styles/Proyectos.css";

export default function Proyectos() {
  const proyectos = [
    {
      id: 1,
      titulo: "Centro dermatologico",
      descripcion: "Aplicación web para gestionar un centro medico. Desarrollada con React, Node.js y MySQL",
      link: "https://cmddemo.radixweb.com.ar/login"
    },
    {
      id: 2,
      titulo: "Juego de celular",
      descripcion: "Juego de celular desarrollado en React con funcionalidades interactivas para jugar con amigos de manera local",
      link: "https://aura-o-laura.netlify.app/"
    },
    {
      id: 3,
      titulo: "Pagina web completa",
      descripcion: "Pagina web completa desarrollada con React, incluyendo diseño responsive y animaciones CSS",
      link: "https://zontesbarcelona.com/"
    }
  ];

  return (
    <section id="proyectos" className="proyectos-section">
      <h2 className="section-title">Proyectos Realizados</h2>
      <div className="proyectos-list">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="proyecto-card">
            <h3 className="proyecto-title">{proyecto.titulo}</h3>
            <p className="proyecto-description">{proyecto.descripcion}</p>
            <a href={proyecto.link} target="_blank" rel="noopener noreferrer" className="proyecto-link">
              Ver proyecto →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
