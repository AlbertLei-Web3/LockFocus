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
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath, onNavigate }) => {
  return (
    <LayoutContainer>
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      <ContentContainer>
        <Header currentPath={currentPath} />
        <MainContent>
          {children}
        </MainContent>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Layout; 