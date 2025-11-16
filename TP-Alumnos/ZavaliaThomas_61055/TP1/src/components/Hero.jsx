import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section id="home" className="hero-section">
      <Container className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-4 text-white mb-4"
        >
          Bienvenido a mi Portafolio
        </motion.h1>
      </Container>
    </section>
  );
}

export default Hero;