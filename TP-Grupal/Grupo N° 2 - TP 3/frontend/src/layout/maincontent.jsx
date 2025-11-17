import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const MainContentContainer = styled.main`
  flex-grow: 1;
  padding: 30px;
  overflow-y: auto;
  height: 100vh;

  @media (max-width: 900px) {
    padding: 20px;
  }
`;

const MainContent = ({ title, description, children }) => {
  return (
    <MainContentContainer>
      <Header title={title} description={description} />
      {children}
    </MainContentContainer>
  );
};

export default MainContent;