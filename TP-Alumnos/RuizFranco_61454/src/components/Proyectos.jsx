import React from 'react';

const listaProyectos = [
  {
    id: 1,
    nombre: 'Proyecto de E-commerce',
    descripcion: 'Una tienda online desarrollada con MERN stack.',
    url: 'https://github.com/tu-usuario/e-commerce'
  },
  {
    id: 2,
    nombre: 'App del Clima',
    descripcion: 'Aplicación que consume una API para mostrar el clima.',
    url: 'https://github.com/tu-usuario/weather-app'
  }
];

const Proyectos = () => {
  return (
    <section id="proyectos" className="seccion">
      <h2>Proyectos Realizados</h2>
      <div className="lista-proyectos">
        {listaProyectos.map(proyecto => (
          <div key={proyecto.id} className="proyecto-item">
            <h3>{proyecto.nombre}</h3>
            <p>{proyecto.descripcion}</p>
            <a href={proyecto.url} target="_blank" rel="noopener noreferrer">
              Ver en GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;