import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { TimerState, startTimer, pauseTimer, resumeTimer, stopTimer, tickTimer, skipBreak } from '../store/slices/timerSlice';
import { addTask } from '../store/slices/tasksSlice';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: var(--spacing-lg);
`;

const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) 0;
  border-radius: var(--border-radius-lg);
  background-color: ${props => props.theme.cardBackground};
  box-shadow: var(--shadow-sm);
`;

const TimerDisplay = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-lg);
  font-variant-numeric: tabular-nums;
`;

const TimerControls = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  
  background-color: ${props => 
    props.variant === 'primary' ? 'var(--primary-color)' :
    props.variant === 'secondary' ? 'var(--secondary-color)' :
    props.variant === 'danger' ? 'var(--danger-color)' :
    'var(--background-light)'
  };
  
  color: ${props => 
    props.variant ? 'var(--text-light)' : 'var(--text-dark)'
  };
  
  &:hover {
    background-color: ${props => 
      props.variant === 'primary' ? 'var(--primary-dark)' :
      props.variant === 'secondary' ? 'var(--secondary-dark)' :
      props.variant === 'danger' ? 'var(--danger-color)' :
      'rgba(0, 0, 0, 0.05)'
    };
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TaskInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: var(--spacing-md);
  border: 1px solid #ddd;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-md);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-light);
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`;

const StatCard = styled.div`
  background-color: ${props => props.theme.cardBackground};
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  
  h3 {
    font-size: var(--font-size-md);
    color: var(--text-dark);
    margin-bottom: var(--spacing-sm);
    opacity: 0.8;
  }
  
  .value {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--primary-color);
  }
`;

// 格式化时间为MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { state: timerState, secondsLeft, workDuration, completedPomodoros, currentTask } = 
    useSelector((state: RootState) => state.timer);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  
  const [taskName, setTaskName] = useState('');
  
  // 每秒钟更新计时器
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerState === TimerState.RUNNING || timerState === TimerState.BREAK || timerState === TimerState.LONG_BREAK) {
      interval = setInterval(() => {
        dispatch(tickTimer());
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerState, dispatch]);
  
  // 启动番茄计时器
  const handleStartTimer = () => {
    if (!taskName.trim()) return;
    dispatch(startTimer(taskName));
    setTaskName('');
  };
  
  // 处理暂停/继续
  const handlePauseResume = () => {
    if (timerState === TimerState.RUNNING) {
      dispatch(pauseTimer());
    } else if (timerState === TimerState.PAUSED) {
      dispatch(resumeTimer());
    }
  };
  
  // 处理停止
  const handleStop = () => {
    dispatch(stopTimer());
  };
  
  // 处理跳过休息
  const handleSkipBreak = () => {
    dispatch(skipBreak());
  };
  
  // 今日完成的任务数量
  const todayTasks = tasks.filter(task => {
    const taskDate = new Date(task.startTime);
    const today = new Date();
    return taskDate.getDate() === today.getDate() &&
           taskDate.getMonth() === today.getMonth() &&
           taskDate.getFullYear() === today.getFullYear();
  });
  
  // 今日专注总分钟数
  const todayMinutes = todayTasks.reduce((total, task) => {
    if (task.isCompleted) {
      return total + workDuration;
    }
    return total;
  }, 0);
  
  return (
    <DashboardContainer>
      <TimerSection>
        <TimerDisplay>{formatTime(secondsLeft)}</TimerDisplay>
        
        {timerState === TimerState.IDLE ? (
          <>
            <TaskInput
              type="text"
              placeholder="输入您将要专注的任务..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStartTimer()}
            />
            <Button variant="primary" onClick={handleStartTimer}>
              开始专注
            </Button>
          </>
        ) : (
          <>
            {currentTask && <p style={{ marginBottom: 'var(--spacing-md)' }}>当前任务: {currentTask}</p>}
            
            <TimerControls>
              {(timerState === TimerState.RUNNING || timerState === TimerState.PAUSED) && (
                <>
                  <Button variant="secondary" onClick={handlePauseResume}>
                    {timerState === TimerState.RUNNING ? '暂停' : '继续'}
                  </Button>
                  <Button variant="danger" onClick={handleStop}>
                    放弃
                  </Button>
                </>
              )}
              
              {(timerState === TimerState.BREAK || timerState === TimerState.LONG_BREAK) && (
                <Button variant="secondary" onClick={handleSkipBreak}>
                  跳过休息
                </Button>
              )}
            </TimerControls>
          </>
        )}
      </TimerSection>
      
      <StatsSection>
        <StatCard>
          <h3>今日番茄数</h3>
          <div className="value">{completedPomodoros}</div>
        </StatCard>
        
        <StatCard>
          <h3>今日专注时间</h3>
          <div className="value">{todayMinutes} 分钟</div>
        </StatCard>
        
        <StatCard>
          <h3>完成任务数</h3>
          <div className="value">{todayTasks.filter(t => t.isCompleted).length}</div>
        </StatCard>
      </StatsSection>
    </DashboardContainer>
  );
};

export default Dashboard; 