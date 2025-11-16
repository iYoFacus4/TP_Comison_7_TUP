import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// Asumiendo que tienes tu logo en una carpeta de assets
// import logoImage from '../../assets/logo.png.jpg'; 

const SidebarContainer = styled.aside`
  width: 260px;;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  border-radius:  0px 16px 16px 0px;
  flex-direction: column;
    background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(252, 252, 252, 0.91) 35%,
    rgba(59, 131, 246, 0.88) 100%
  );
  backdrop-filter: blur(10px); /* efecto vidrio */
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  @media (max-width: 900px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 40px;
`;

const AppTitle = styled.h2`
  font-weight: 600;
  font-size: 1.2rem;
  color: #111827; /* negro suave */
`;

const Nav = styled.nav`
  margin-top: 20px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  border-radius: 8px;
  text-decoration: none;
  color: #111827;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &.active {
    background-color: var(--primary-blue);
    color: #ffff
  }

  &:hover:not(.active) {
    background-color: rgba(116, 123, 128, 0.73);
  }

  i {
    width: 20px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        {/* <Logo src={logoImage} alt="Logo de la Tienda" /> */}
        <AppTitle>Indumentaria</AppTitle>
      </SidebarHeader>
      <Nav>
        <StyledNavLink to="/dashboard"><i className="fa-solid fa-chart-line"></i> Dashboard</StyledNavLink>
        <StyledNavLink to="/productos"><i className="fa-solid fa-shirt"></i> Productos</StyledNavLink>
        <StyledNavLink to="/clientes"><i className="fa-solid fa-users"></i> Clientes</StyledNavLink>
        <StyledNavLink to="/ventas"><i className="fa-solid fa-cash-register"></i> Registrar Venta</StyledNavLink>
        <StyledNavLink to="/historial-ventas"><i className="fa-solid fa-receipt"></i> Historial</StyledNavLink>
        <StyledNavLink to="/reportes"><i className="fa-solid fa-chart-pie"></i> Reportes</StyledNavLink>
      </Nav>
    </SidebarContainer>
  );
};

export default Sidebar;