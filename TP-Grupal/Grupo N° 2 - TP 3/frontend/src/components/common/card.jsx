import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: var(--white);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const Card = ({ children, ...props }) => {
  return (
    <CardContainer {...props}>
      {children}
    </CardContainer>
  );
};

export default Card;