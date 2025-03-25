import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { startTimer, pauseTimer, resetTimer, TimerStatus, TimerType } from '../store/slices/timerSlice';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const TimerSection = styled.section`
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TimerDisplay = styled.div`
  font-size: 6rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: var(--spacing-md) 0;
`;

const TimerLabel = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 500;
  margin-bottom: var(--spacing-lg);
  color: ${props => props.theme.textColor};
`;

const TimerControls = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  background-color: ${props => 
    props.variant === 'primary' ? 'var(--primary-color)' : 
    props.variant === 'danger' ? 'var(--danger-color)' : 'transparent'
  };
  color: ${props => props.variant === undefined ? 'var(--primary-color)' : 'white'};
  border: ${props => props.variant === undefined ? '1px solid var(--primary-color)' : 'none'};
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: ${props => 
      props.variant === 'primary' ? 'var(--primary-dark)' : 
      props.variant === 'danger' ? '#dc2626' : 'rgba(var(--primary-rgb), 0.1)'
    };
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
`;

const StatLabel = styled.div`
  font-size: var(--font-size-sm);
  color: ${props => props.theme.textColorLight};
`;

const TaskSection = styled.section`
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
  color: ${props => props.theme.headingColor};
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid var(--border-color-light);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.05);
  }
`;

const TaskName = styled.div`
  font-weight: 500;
`;

const TaskPomodoros = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: ${props => props.theme.textColorLight};
  
  span {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

// 格式化时间（秒 -> MM:SS）
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// 格式化为小时:分钟
const formatHoursMinutes = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}小时 ${minutes}分钟`;
  }
  return `${minutes}分钟`;
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { status, type, timeRemaining, completedPomodoros, totalFocusedToday } = useSelector((state: RootState) => state.timer);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  
  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;
  
  const handleStartTimer = () => {
    dispatch(startTimer());
  };
  
  const handlePauseTimer = () => {
    dispatch(pauseTimer());
  };
  
  const handleResetTimer = () => {
    dispatch(resetTimer());
  };
  
  // 获取最近的几个任务
  const recentTasks = [...tasks]
    .sort((a, b) => b.startTime - a.startTime)
    .slice(0, 3);
  
  return (
    <DashboardContainer>
      <TimerSection>
        <TimerLabel>
          {type === TimerType.FOCUS ? '🍅 专注时间' : 
           type === TimerType.BREAK ? '☕ 休息时间' : 
           '🌴 长休息时间'}
        </TimerLabel>
        <TimerDisplay>{formatTime(timeRemaining)}</TimerDisplay>
        
        <TimerControls>
          {!isRunning && !isPaused && (
            <Button variant="primary" onClick={handleStartTimer}>
              开始专注
            </Button>
          )}
          
          {isRunning && (
            <Button onClick={handlePauseTimer}>
              暂停
            </Button>
          )}
          
          {isPaused && (
            <Button variant="primary" onClick={handleStartTimer}>
              继续
            </Button>
          )}
          
          {(isRunning || isPaused) && (
            <Button variant="danger" onClick={handleResetTimer}>
              重置
            </Button>
          )}
        </TimerControls>
      </TimerSection>
      
      <StatsSection>
        <StatCard>
          <StatValue>{completedPomodoros}</StatValue>
          <StatLabel>今日完成的番茄钟</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{formatHoursMinutes(totalFocusedToday)}</StatValue>
          <StatLabel>今日专注时长</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatValue>{tasks.filter(t => t.isCompleted).length}</StatValue>
          <StatLabel>已完成任务</StatLabel>
        </StatCard>
      </StatsSection>
      
      <TaskSection>
        <SectionTitle>最近任务</SectionTitle>
        
        {recentTasks.length > 0 ? (
          <TaskList>
            {recentTasks.map(task => (
              <TaskItem key={task.id}>
                <TaskName>{task.name}</TaskName>
                <TaskPomodoros>
                  <span>{task.actualPomodoros}</span> / {task.estimatedPomodoros} 个番茄钟
                </TaskPomodoros>
              </TaskItem>
            ))}
          </TaskList>
        ) : (
          <div>暂无任务记录</div>
        )}
      </TaskSection>
    </DashboardContainer>
  );
};

export default Dashboard; 