import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
  background-color: ${props => props.theme.backgroundColor};
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentContainer>
        <Header />
        <MainContent>
          {children}
        </MainContent>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Layout; 