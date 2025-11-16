// components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'; 
import { ListGroup } from "react-bootstrap";
import { House, Scissors, People, Calendar } from "react-bootstrap-icons";
import "../styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation(); 

  
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-container">
      <h4 className="sidebar-title">💈 Peluquería</h4>
      <ListGroup variant="flush" className="sidebar-list">

        
        <ListGroup.Item
          as={Link}
          to="/app/dashboard" 
          action
          active={isActive("/app/dashboard")}
          className="sidebar-item"
        >
          <House /> Dashboard
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/app/clientes"
          action
          active={isActive("/app/clientes")}
          className="sidebar-item"
        >
          <People /> Clientes
        </ListGroup.Item>
<ListGroup.Item
          as={Link}
          to="/app/servicios"
          action
          active={isActive("/app/servicios")}
          className="sidebar-item"
        >
          <Scissors /> Servicios
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/app/turnos"
          action
          active={isActive("/app/turnos")}
          className="sidebar-item"
        >
          <Calendar /> Turnos
        </ListGroup.Item>
        

      </ListGroup>
    </div>
  );
}