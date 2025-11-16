import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineStar,
  AiOutlineProject,
  AiOutlineGlobal,
} from "react-icons/ai";

function Header() {
  const [expandido, setExpandido] = useState(false);
  const [colorNav, setColorNav] = useState(false);

  useEffect(() => {
    function manejarScroll() {
      if (window.scrollY >= 20) {
        setColorNav(true);
      } else {
        setColorNav(false);
      }
    }

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  return (
    <Navbar
      expanded={expandido}
      fixed="top"
      expand="md"
      className={colorNav ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="#home" className="d-flex">
          <div className="text-purple" style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
            TZ
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpandido(expandido ? false : "expanded")}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link href="#home" onClick={() => setExpandido(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Inicio
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#about" onClick={() => setExpandido(false)}>
                <AiOutlineUser style={{ marginBottom: "2px" }} /> Acerca de mí
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#estudios" onClick={() => setExpandido(false)}>
                <AiOutlineBook style={{ marginBottom: "2px" }} /> Estudios
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#skills" onClick={() => setExpandido(false)}>
                <AiOutlineStar style={{ marginBottom: "2px" }} /> Habilidades
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#proyectos" onClick={() => setExpandido(false)}>
                <AiOutlineProject style={{ marginBottom: "2px" }} /> Proyectos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#idiomas" onClick={() => setExpandido(false)}>
                <AiOutlineGlobal style={{ marginBottom: "2px" }} /> Idiomas
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;