import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  font-size: 0.95rem;

  /* Style variants */
  ${({ variant }) => variant === 'primary' && css`
    background-color: var(--primary-blue);
    color: var(--white);
    &:hover {
      background-color: var(--primary-blue-dark);
    }
  `}

  ${({ variant }) => variant === 'secondary' && css`
    background-color: #E0E7FF;
    color: var(--primary-blue);
    &:hover {
      background-color: #C7D2FE;
    }
  `}

  &:disabled {
    background-color: var(--border-color);
    color: var(--text-light);
    cursor: not-allowed;
  }

  i {
    font-size: 0.9em;
  }
`;

const Button = ({ children, variant = 'primary', icon, ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {icon && <i className={`fa-solid fa-${icon}`}></i>}
      {children}
    </StyledButton>
  );
};

export default Button;