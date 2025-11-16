import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import ProyectoCard from './ProyectoCard';
import { AiOutlineProject } from 'react-icons/ai';
import { DiReact, DiNodejs, DiJavascript1 } from 'react-icons/di';
import { SiDotnet } from "react-icons/si";
import { SiPostgresql } from 'react-icons/si';

const datosProyectos = [
  {
    titulo: 'Sistema de Reserva de Películas',
    imagenes: ['/cine.png'],
    ghLink: 'https://github.com/ThomasZavalia/MovieReservationSystem',
    descripcion: 'Este es un sistema completo desarrollado para gestionar la reserva de entradas de cine. Permite a los usuarios ver películas, seleccionar asientos y realizar reservas. El backend está construido para ser robusto y escalable.',
    technologies: ['.NET','PostgreSQL'],
  },
  {
    titulo: 'Ecommerce API',
    imagenes: ['/ecommerce.png'],
    ghLink: 'https://github.com/ThomasZavalia/E-commerce',
    descripcion: 'API RESTful para una plataforma de comercio electrónico que maneja productos, usuarios y pedidos. Implementa autenticación JWT y sigue las mejores prácticas de desarrollo de API.',
    technologies: ['.NET', 'PostgreSQL'],
  },
  {
    titulo: 'ZavaComics',
    imagenes: ['/comic.png'],
    ghLink: 'https://github.com/ThomasZavalia/ZavaComics',
    descripcion: 'Aplicación web fullstack para la administración y lectura de cómics digitales Los usuarios pueden registrarse, iniciar sesión, comprar cómics y acceder a su biblioteca personal para leerlos online. El sistema cuenta con autenticación JWT, rutas protegidas y un panel de administración donde los administradores pueden crear, editar y eliminar cómics.',
    technologies: ['React', 'Node.js', 'PostgreSQL']
  }
];


const obtenerIconoTecnologia = (tecnologia) => {
  switch (tecnologia.toLowerCase()) {
    case 'react':
      return <DiReact />;
    case 'node.js':
      return <DiNodejs />;
    case '.net':
      return <SiDotnet />;
    case 'javascript':
      return <DiJavascript1 />;
    case 'postgresql':
      return <SiPostgresql />;
    default:
      return null;
  }
};

function Proyectos() {
 
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  
  const manejarMostrarModal = (proyecto) => {
    setProyectoSeleccionado(proyecto);
    setMostrarModal(true);
  };
  const manejarCerrarModal = () => setMostrarModal(false);

  return (
    <>
      <section id="proyectos" className="project-section">
        <Container>
          <h1 className="project-heading">
            <AiOutlineProject className="me-2" />
            Mis <strong className="text-purple">Proyectos</strong> Recientes
          </h1>
          <p style={{ color: 'white', textAlign: 'center' }}>
            Aquí hay algunos proyectos en los que he trabajado.
          </p>
          <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
            {datosProyectos.map((proyecto, indice) => (
              <Col md={4} className="project-card" key={indice}>
                {/* Usamos las funciones traducidas */}
                <div onClick={() => manejarMostrarModal(proyecto)} style={{ cursor: 'pointer' }}>
                  <ProyectoCard
                    imgPath={proyecto.imagenes?.[0]}
                    title={proyecto.titulo}
                    description={proyecto.descripcion.substring(0, 90) + "..."} 
                    ghLink={proyecto.ghLink}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

 
      {proyectoSeleccionado && (
        <Modal show={mostrarModal} onHide={manejarCerrarModal} centered size="lg">
          <div className="project-modal-content">
            <Modal.Header closeButton>
              <Modal.Title>{proyectoSeleccionado.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{proyectoSeleccionado.descripcion}</p>
              <hr />
              <h5>Tecnologías Usadas:</h5>
              <div className="tech-stack-icons">
                {proyectoSeleccionado.technologies.map((tecnologia, i) => (
                  <div className="tech-icon-item" key={i}>
                    {obtenerIconoTecnologia(tecnologia)}
                    <span>{tecnologia}</span>
                  </div>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={manejarCerrarModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Proyectos;