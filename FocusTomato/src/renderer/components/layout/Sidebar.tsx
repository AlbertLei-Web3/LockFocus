import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TimerStatus } from '../../store/slices/timerSlice';

const SidebarContainer = styled.aside`
  width: 240px;
  height: 100%;
  background-color: ${props => props.theme.sidebarBackground};
  color: ${props => props.theme.textColor};
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
`;

const LogoContainer = styled.div`
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
`;

const Logo = styled.div`
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--primary-color);
`;

const NavigationContainer = styled.nav`
  flex: 1;
  padding: var(--spacing-md) 0;
  overflow-y: auto;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  color: ${props => props.theme.textColor};
  text-decoration: none;
  font-weight: 500;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
  }
  
  &.active {
    background-color: rgba(var(--primary-rgb), 0.15);
    color: var(--primary-color);
    border-left: 3px solid var(--primary-color);
  }
  
  &.timer-active {
    background-color: rgba(var(--primary-rgb), 0.1);
  }
`;

const NavIcon = styled.span`
  margin-right: var(--spacing-md);
  display: flex;
  align-items: center;
  font-size: var(--font-size-lg);
`;

const StatusContainer = styled.div`
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  font-size: var(--font-size-sm);
  color: ${props => props.theme.textColorLight};
`;

const Sidebar: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.timer);
  const isTimerActive = status === TimerStatus.RUNNING;
  
  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo>FocusTomato</Logo>
      </LogoContainer>
      
      <NavigationContainer>
        <NavItem to="/">
          <NavIcon>📊</NavIcon>
          仪表盘
        </NavItem>
        <NavItem to="/tasks">
          <NavIcon>📝</NavIcon>
          任务记录
        </NavItem>
        <NavItem to="/barrier">
          <NavIcon>🔒</NavIcon>
          专注屏障
        </NavItem>
        <NavItem to="/settings">
          <NavIcon>⚙️</NavIcon>
          设置
        </NavItem>
      </NavigationContainer>
      
      <StatusContainer>
        {isTimerActive ? '⏱️ 专注进行中...' : '准备好开始了吗？'}
      </StatusContainer>
    </SidebarContainer>
  );
};

export default Sidebar; 