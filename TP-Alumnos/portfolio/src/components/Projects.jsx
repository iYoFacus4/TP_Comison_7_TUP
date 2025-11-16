import React from 'react';
import './styles/Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'Sistema de Gestión',
      description: 'Aplicación web completa desarrollada con .NET y React para gestión empresarial.',
      technologies: ['C#', '.NET', 'React', 'SQL Server'],
      github: '#',
      demo: '#'
    },
    {
      title: 'E-commerce Moderno',
      description: 'Tienda online con carrito de compras, autenticación y pasarela de pagos.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Dashboard Analítico',
      description: 'Panel de control interactivo con visualización de datos en tiempo real.',
      technologies: ['React', 'JavaScript', 'CSS3', 'API REST'],
      github: '#',
      demo: '#'
    },
    {
      title: 'API RESTful',
      description: 'Backend escalable con autenticación JWT y documentación Swagger.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="proyectos" className="projects">
      <div className="container">
        <h2 className="section-title">Proyectos Destacados</h2>
        <p className="section-subtitle">
          Algunos de los proyectos en los que he trabajado
        </p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
