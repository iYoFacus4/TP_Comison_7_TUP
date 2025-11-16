import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import CerrarSesion from '../assets/cerrarsesion.png';

const MainHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
  }
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
  p {
    color: var(--text-light);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-blue);
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = ({ title, description }) => {
  const navigate = useNavigate(); // ✅ inicializamos navigate

  const handleLogout = () => {
    // 🧹 Borrar datos del localStorage
    localStorage.removeItem("auth");

    // 🔁 Redirigir al login
    navigate("/");
  };

  return (
    <MainHeaderContainer>
      <HeaderTitle>
        <h1>{title}</h1>
        <p>{description}</p>
      </HeaderTitle>
      <UserInfo>
        <span>
          Hola, <strong>[Usuario]</strong>
        </span>

        {/* 🔘 Botón real de logout */}
        <LogoutButton onClick={handleLogout}>
           <img src={CerrarSesion} alt="Cerrar sesión" style={{ width: "42px", height: "42px" }} />
        </LogoutButton>
      </UserInfo>
    </MainHeaderContainer>
  );
};

export default Header;
