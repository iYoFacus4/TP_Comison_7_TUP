import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardLink = styled(Link)`
  background-color: #ffff;
  padding: 25px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  text-decoration: none;
  color: var(--text-dark);
  display: block;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px  rgba(0, 120, 218, 0.81);
  }
`;

const CardIcon = styled.i`
  font-size: 2rem;
  color: var(--primary-blue);
  margin-bottom: 15px;
  display: block;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ActionCard = ({ to, icon, title, description }) => {
  return (
    <CardLink to={to}>
      <CardIcon className={`fa-solid fa-${icon}`} />
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardLink>
  );
};

export default ActionCard;