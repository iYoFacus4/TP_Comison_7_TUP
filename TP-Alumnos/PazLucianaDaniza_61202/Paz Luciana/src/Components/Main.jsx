// src/components/Main.jsx
import React from 'react';
import Estudios from './Estudios';
import Proyectos from './Proyectos';

// Recibe la sección activa del Home.jsx
const Main = ({ seccionActiva }) => {
    
    // Objeto que mapea los IDs de sección a sus componentes o contenido
    const secciones = {
        'bio': (
            <section id="about_me" className="section-bio">
                <h2>👋 Sobre Mí: Luciana Daniza Paz</h2>
                <p>Soy estudiante de la Tecnicatura Universitaria en Programación en la Universidad Tecnológica Nacional (UTN - FRT). Actualmente, estoy enfocado/a en el desarrollo Front-end, una rama que me apasiona por su naturaleza creativa y su impacto directo en la experiencia del usuario.</p>
                <p>Mis conocimientos se centran en el ecosistema de desarrollo web, manejando JavaScript, HTML y CSS (incluyendo estilos con frameworks como Bootstrap/Tailwind, o CSS tradicional). Además, tengo experiencia con bases de datos utilizando MySQL Workbench y nociones de C#.</p>
                <p>Actualmente me encuentro ampliando mis habilidades con React, aplicando conceptos de componentes, props y el DOM virtual para crear interfaces dinámicas y reutilizables. Busco oportunidades para seguir aprendiendo y contribuir con proyectos desafiantes en el sector tecnológico.</p>
            </section>
        ),
        'estudios': (
            <Estudios />
        ),
        'proyectos': (
            <Proyectos />
        ),
        
        // SECCIÓN DE CONTACTO CON FORMULARIO
        'contacto': (
            <section id="contacto" className="section-contacto">
                <h2>✉️ Contáctame</h2>
                <p className="contacto-intro">
                    ¡Conversemos sobre tu próximo proyecto! Puedes enviarme un mensaje directamente desde este formulario.
                </p>

                {/* CLAVE: AQUÍ ESTÁ LA CORRECCIÓN CON TU URL DE FORMSPREE */}
                <form className="contact-form" action="https://formspree.io/f/xqayjknw" method="POST">
                    
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <input type="text" id="nombre" name="nombre" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" name="_replyto" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
                    </div>

                    <button type="submit" className="cta-button form-submit-button">
                        Enviar Mensaje
                    </button>
                    
                    <p className="contacto-social-links">
                        O encuéntrame en: 
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                         | 
                        <a href="https://github.com/LuPaz-GH" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </p>
                </form>
            </section>
        )
    };
    
    const contenidoActivo = secciones[seccionActiva] || secciones['bio']; 
    
    return (
        <main className="main-content">
             {contenidoActivo}
        </main>
    );
};

export default Main;