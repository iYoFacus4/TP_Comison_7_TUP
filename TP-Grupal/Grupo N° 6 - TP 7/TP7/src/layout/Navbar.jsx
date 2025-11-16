import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const cerrarSesion = () => {
        logout(); // Limpia el localStorage y el estado de autenticación
        navigate('/login'); // Redirige al login
    }


    return(

        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container fluid>
                <Navbar.Brand href="/dashboard">Dashboard con datos falsos</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <nav className="ms-auto">
                        <NavDropdown 
                            title={
                                <div className="d-inline-flex align-items-center">
                                    <PersonCircle size={24} color="white"/>
                                    {user && <span className="ms-2 text-light">{user.email}</span>}
                                </div>
                            } 
                            id="basic-nav-dropdown" 
                            align="end"
                        >
                            <NavDropdown.Item href="#Perfil">
                                <i className="fas fa-user me-2"></i>Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item 
                                onClick={cerrarSesion} 
                                className="text-danger"
                            >
                                <i className="fas fa-sign-out-alt me-2"></i>
                                Cerrar sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    )
}

export default AppNavbar;