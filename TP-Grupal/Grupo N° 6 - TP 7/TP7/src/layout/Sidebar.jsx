import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseDoorFill, PeopleFill, BarChartFill } from "react-bootstrap-icons";
import "./Sidebar.css";

const Sidebar = () => {


    return(

        <Nav className="flex-column bg-light h-100 d-flex shadow-sm p-3">
            <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center mb-2">
                <HouseDoorFill size={20} className="me-2"/>
                Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/miembros" className="d-flex align-items-center mb-2">
                <PeopleFill size={20} className="me-2"/>
                Miembros y Actividades
            </Nav.Link>
            <Nav.Link as={Link} to="/reportes" className="d-flex align-items-center mb-2">
                <BarChartFill size={20} className="me-2"/>
                Reportes
            </Nav.Link>
        </Nav>
    )
}

export default Sidebar;