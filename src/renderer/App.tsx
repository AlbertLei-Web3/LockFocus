import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/themes';
import { RootState } from './store';
import { tick } from './store/slices/timerSlice';

// 布局组件
import Layout from './components/layout/Layout';

// 页面组件
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import BarrierPage from './pages/BarrierPage';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
`;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  
  // 设置计时器
  useEffect(() => {
    const timerInterval = setInterval(() => {
      dispatch(tick());
    }, 1000);
    
    return () => {
      clearInterval(timerInterval);
    };
  }, [dispatch]);
  
  // 在静态页面版本中，使用state模拟路由
  const [currentPath, setCurrentPath] = useState('/');
  
  // 模拟路由组件
  const StaticRouter = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/tasks':
        return <TasksPage />;
      case '/settings':
        return <SettingsPage />;
      case '/barrier':
        return <BarrierPage />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppContainer>
        {window.location.href.includes('webpack') ? (
          // 使用静态方式
          <Layout currentPath={currentPath} onNavigate={setCurrentPath}>
            <StaticRouter />
          </Layout>
        ) : (
          // 使用React Router
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/barrier" element={<BarrierPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </Router>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App; 