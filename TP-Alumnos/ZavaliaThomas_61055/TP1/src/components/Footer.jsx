import React from 'react';
import Container from 'react-bootstrap/Container';
import { AiOutlineMail, AiOutlinePhone, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'; 

function Footer() {
  return (

    <footer className="bg-dark text-white py-4 mt-5" style={{ position: 'relative', zIndex: 1 }}>
     
      <Container className="text-center">
        <div className="mb-3 d-flex justify-content-center align-items-center">
          <AiOutlineMail className="me-2" /> <a href="mailto:zavaliathomas@gmail.com?subject=Contacto%20desde%20tu%20Portafolio" className="text-white text-decoration-none">zavaliathomas@gmail.com</a>
        
        </div>
        <div className="mb-3">
          <a href="https://github.com/ThomasZavalia" target="_blank" rel="noopener noreferrer" className="me-3 text-white text-decoration-none">
            <AiFillGithub size={24} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/thomas-zavalia-6425302bb/" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
            <AiFillLinkedin size={24} /> LinkedIn
          </a>
        </div>
        <p>&copy; 2025 Mi Portfolio. Todos los derechos reservados.</p>
      </Container>
   
    </footer>
  );
}

export default Footer;