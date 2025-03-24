import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';
import { TimerStatus, TimerType } from '../../store/slices/timerSlice';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: ${props => props.theme.cardBackground};
  border-bottom: 1px solid var(--border-color);
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: var(--font-size-xl);
  color: ${props => props.theme.headingColor};
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);
  color: ${props => props.theme.textColor};
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-full);
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: ${props => props.theme.backgroundColor};
  font-weight: 500;
  
  span {
    color: var(--primary-color);
  }
`;

// 根据当前路径获取页面标题
const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/':
      return '仪表盘';
    case '/tasks':
      return '任务记录';
    case '/barrier':
      return '专注屏障';
    case '/settings':
      return '设置';
    default:
      return '仪表盘';
  }
};

// 格式化时间（秒 -> MM:SS）
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { status, type, timeRemaining } = useSelector((state: RootState) => state.timer);
  
  const isTimerActive = status === TimerStatus.RUNNING;
  const pageTitle = getPageTitle(location.pathname);
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <HeaderContainer>
      <PageTitle>{pageTitle}</PageTitle>
      
      <HeaderControls>
        {(status === TimerStatus.RUNNING || status === TimerStatus.PAUSED) && (
          <TimerDisplay>
            <span>
              {type === TimerType.FOCUS ? '🍅 专注' : type === TimerType.BREAK ? '☕ 休息' : '🌴 长休息'}
            </span>
            <span>{formatTime(timeRemaining)}</span>
          </TimerDisplay>
        )}
        
        <ThemeToggle onClick={handleThemeToggle}>
          {darkMode ? '🌞' : '🌙'}
        </ThemeToggle>
      </HeaderControls>
    </HeaderContainer>
  );
};

export default Header; 