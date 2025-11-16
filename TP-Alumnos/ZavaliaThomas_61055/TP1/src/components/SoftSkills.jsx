import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  DiJavascript1,
  DiReact,
  DiMongodb,
  DiGit,
} from 'react-icons/di';
import {
  SiPostgresql,
} from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { FaHtml5 } from "react-icons/fa";


const skills = [
  { icon: <DiJavascript1 />, title: 'JavaScript' },
  { icon: <DiReact />, title: 'React' },
  {icon: <FaHtml5 />, title: 'HTML5' },
  { icon: <DiMongodb />, title: 'MongoDB' },
  { icon: <DiGit />, title: 'Git' },
  { icon: <TbBrandCSharp />, title: 'C#' },
  { icon: <SiPostgresql />, title: 'PostgreSQL' },
 
];

function Skills() {
 
  const cardVariant = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="skills" className="skills-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} className="text-center">
            <h1 className="project-title-settings">
              Habilidades <strong className="text-purple">Profesionales</strong>
            </h1>
            <p style={{ color: 'white' }}>
              Aquí hay algunas tecnologías con las que he trabajado recientemente.
            </p>
          </Col>
        </Row>

        <Row style={{ justifyContent: 'center', paddingBottom: '50px' }}>
          {skills.map((skill, index) => (
            <Col xs={4} md={2} className="tech-icons" key={index}>
              <motion.div
                variants={cardVariant}
                initial="initial"
                whileInView="animate"
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="tech-icon-box"
              >
                {skill.icon}
                <p style={{ marginTop: '10px' }}>{skill.title}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Skills;
