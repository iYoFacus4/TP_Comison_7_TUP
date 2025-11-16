import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

function AcercaDeMi() {
  return (
    <section id="about" className="about-section">
      <Container>
        <Row>
      
          <Col md={7} className="about-description">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ fontSize: '2.6em' }}>
                PERMITEME <span className="text-purple">PRESENTARME</span>
              </h1>
              <p className="about-body">
                Soy <b className="text-purple">Zavalia Thomas</b>, un desarrollador apasionado por el mundo del software.
                <br />
                <br />
                Mi especialidad es el desarrollo{' '}
                <b className="text-purple">Backend</b>, con un enfoque principal en el ecosistema de{' '}
                <b className="text-purple">.NET</b>.
                <br />
                <br />
                Me encanta el desafío de diseñar y construir la lógica robusta que hace que las aplicaciones funcionen de manera eficiente y segura. Siempre estoy buscando aprender nuevas tecnologías para mejorar mis habilidades.
              </p>
            </motion.div>
          </Col>

      
          <Col md={5} className="about-img">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="../../public/avatar.png" 
                className="img-fluid" 
                alt="about" 
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AcercaDeMi;