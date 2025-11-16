import React from "react";
import styled from "styled-components";
import { FaShoppingCart, FaDollarSign, FaTicketAlt, FaTruck } from "react-icons/fa";

const Card = styled.div`
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  color: #0f172a;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px  rgba(0, 120, 218, 0.81);
  }
`;

const Icon = styled.div`
  font-size: 1.8rem;
  color: #2563eb;
  margin-bottom: 8px;
`;

const Title = styled.h4`
  font-size: 0.95rem;
  margin: 0;
  color: #1e293b;
`;

const Value = styled.h2`
  font-size: 2rem;
  margin: 8px 0 6px;
  color: #111827;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(203, 213, 225, 0.4);
  border-radius: 6px;
  overflow: hidden;
  margin-top: 6px;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $percent }) => `${$percent}%`};
  background: ${({ $color }) => $color};
  border-radius: 6px;
  transition: width 0.4s ease-in-out;
`;

const Comparison = styled.p`
  font-size: 0.85rem;
  color: #475569;
  margin-top: 8px;
`;

const icons = {
  cart: <FaShoppingCart />,
  dollar: <FaDollarSign />,
  ticket: <FaTicketAlt />,
  truck: <FaTruck />,
};

const KpiCard = ({ icon, title, value, comparison }) => {
  // 🎯 simulamos porcentaje y color según el icono
  let progress = 0;
  let color = "#3b82f6";

  switch (icon) {
    case "cart":
      progress = 27;
      color = "#3b82f6"; // azul
      break;
    case "dollar":
      progress = 45;
      color = "#10b981"; // verde
      break;
    case "ticket":
      progress = 0;
      color = "#8b5cf6"; 
      break;
    case "truck":
      progress = 0;
      color = "#f59e0b"; 
      break;
    default:
      break;
  }

  return (
    <Card>
      <Icon>{icons[icon]}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>

      <ProgressBar>
        <ProgressFill $percent={progress} $color={color} />
      </ProgressBar>

      <Comparison>{comparison}</Comparison>
    </Card>
  );
};

export default KpiCard;