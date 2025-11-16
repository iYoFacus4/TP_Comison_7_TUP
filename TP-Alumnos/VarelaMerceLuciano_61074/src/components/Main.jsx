import React from 'react';

/* componentes hijos a importar*/

import Proyectos from './Proyectos';
import Estudios from './Estudios';
import Experiencia from './Experiencia';
import Idiomas from './Idiomas';
import SoftSkills from './SoftSkills';

const listaProyectos = 
[
  {
    id: 1,
    titulo: "Juego de Preguntas (Trivia)",
    descripcion: "Una trivia sobre conocimientos generales utilizando C#.",
    urlGithub: "https://github.com/LuchoMerce/JuegDePreguntas.git"
  },
  {
    id: 2,
    titulo: "Implementación de Clases en C#",
    descripcion: "Proyecto con implementación de clases y que contiene Calculadora, contador de objetos, gestión de personas, gestor de alumnos, pregunta de seguridad tipo contraseña",
    urlGithub: "https://github.com/LuchoMerce/Proyecto-de-implementacion-de-clases.git"
  },
  {
    id: 3,
    titulo: "Proyecto de ventas + Principios SOLID en C#",
    descripcion: "Proyecto de ventas que aplica los principios SOLID",
    urlGithub: "https://github.com/LuchoMerce/Venta-de-Productos-SOLID.git"
  },
  {
    id: 4,
    titulo: "Este Portfolio (React)",
    descripcion: "Mi portfolio personal creado con React y Vite. Aquí muestro mis habilidades y proyectos.",
    urlGithub: "https://github.com/LuchoMerce/Portfolio.git"
  }
];


const listaEstudios = 
[
  {
    id: 1,
    titulo: "Tecnicatura Universitaria en Programación",
    institucion: "Universidad Tecnológica Nacional (UTN) - Facultad Regional de Tucumán",
    periodo: "2024 - 2025",
    estado: "En curso"
  },
  {
    id: 2,
    titulo: "Programación Web Full Stack PHP",
    institucion: "Instituto Nacional de Educación Técnologica -- Educación IT",
    periodo: "2019",
    estado: "Completado"
  }
]

const listaExperiencia = [
  {
    id: 1,
    puesto: "Soporte Técnico en telecomunicaciones",
    empresa: "Teleperformance",
    periodo: "Junio 2021 - Actualidad",
    tareas: [
      "Atención de primera línea a clientes.",
      "Soporte técnico sobre dispositivos y servicios de internet, televisíon y telefonía.",
      "Venta de productos y servicios adicionales."
    ]
  }
];

const listaIdiomas = [
  { id: 1, nombre: "Español", nivel: "Nativo" },
  { id: 2, nombre: "Inglés", nivel: "Intermedio (B1)" }
];

const listaSoftSkills = [
  { id: 1, nombre: "C#" },
  { id: 2, nombre: "React + Vite" },
  { id: 3, nombre: "MySQL" },
  { id: 4, nombre: "PowerBI" },
  { id: 5, nombre: "MongoDB" },
  { id: 6, nombre: "HTML + JS + CSS" },
  { id: 7, nombre: "C, C++" }
];

function Main() {
  return (
    <main className="main-content">
      <section className="seccion">
        <h2>Sobre Mí</h2>
        <p>
          ¡Hola! Soy Luciano. Un apasionado desarrollador en formación, siempre
          buscando aprender nuevas tecnologías y mejorar mis habilidades. Me
          encanta enfrentar desafíos y trabajar en proyectos que me permitan
          crecer profesionalmente.
        </p>
      </section>

      {/* --- 2. NAVEGACIÓN INTERNA --- */}
      <nav>
        <a href="#estudios">Ir a Estudios</a>
        <a href="#proyectos">Ir a Proyectos</a>
        <a href="#experiencia">Ir a Experiencia</a>
        <a href="#idiomas">Ir a Idiomas</a>
        <a href="#soft-skills">Ir a SoftSkills</a>
      </nav>

      {/* --- 3. Props para los hijos) --- */}
      
        <Estudios formacion={listaEstudios} />
        
        <Proyectos proyectos={listaProyectos} />
        
        <Experiencia experiencia={listaExperiencia} />

        <Idiomas idiomas={listaIdiomas} />

        <SoftSkills skills={listaSoftSkills} />

    </main>
  );
}

export default Main;