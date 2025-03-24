import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateBarrierStatus } from '../store/slices/barrierSlice';

const BarrierContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 180px);
  text-align: center;
  gap: var(--spacing-xl);
`;

const Title = styled.h1`
  font-size: var(--font-size-xxl);
  margin-bottom: var(--spacing-lg);
  color: ${props => props.theme.headingColor};
`;

const Description = styled.p`
  font-size: var(--font-size-md);
  max-width: 600px;
  margin-bottom: var(--spacing-xxl);
  color: ${props => props.theme.textColor};
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.primary ? 'white' : 'var(--primary-color)'};
  border: ${props => props.primary ? 'none' : '1px solid var(--primary-color)'};
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--primary-dark)' : 'rgba(var(--primary-rgb), 0.1)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-md);
`;

const ConfirmationBox = styled.div`
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-xl);
  max-width: 500px;
`;

const ConfirmationMessage = styled.p`
  margin-bottom: var(--spacing-lg);
  font-weight: 500;
`;

const BarrierSettings = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  width: 500px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-color-light);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  font-weight: 500;
`;

const SettingDescription = styled.div`
  font-size: var(--font-size-sm);
  color: ${props => props.theme.textColorLight};
  margin-top: var(--spacing-xs);
`;

const Select = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
`;

const Input = styled.input`
  width: 80px;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  text-align: center;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--primary-color);
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const Timer = styled.div`
  font-size: var(--font-size-xxl);
  font-weight: 700;
  color: var(--primary-color);
  margin: var(--spacing-md) 0;
`;

const ActiveBarrierInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
`;

const BarrierPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isActive, duration, blockSites, allowTimer } = useSelector((state: RootState) => state.barrier);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds
  const [blockDuration, setBlockDuration] = useState(duration);
  const [blockLevel, setBlockLevel] = useState('medium');
  const [timerEnabled, setTimerEnabled] = useState(allowTimer);
  
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      dispatch(updateBarrierStatus({ isActive: false }));
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft, dispatch]);
  
  const handleActivateBarrier = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirmActivation = () => {
    dispatch(updateBarrierStatus({ 
      isActive: true, 
      duration: blockDuration,
      blockSites: true,
      allowTimer: timerEnabled
    }));
    setTimeLeft(blockDuration * 60);
    setShowConfirmation(false);
  };
  
  const handleCancelActivation = () => {
    setShowConfirmation(false);
  };
  
  const handleDeactivateBarrier = () => {
    dispatch(updateBarrierStatus({ isActive: false }));
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <BarrierContainer>
      {isActive ? (
        <ActiveBarrierInfo>
          <Title>专注屏障已激活</Title>
          <Description>
            你现在处于专注模式。所有干扰都已被屏蔽，直到时间结束或你手动解除屏障。
          </Description>
          
          {allowTimer && (
            <>
              <div>剩余时间</div>
              <Timer>{formatTime(timeLeft)}</Timer>
            </>
          )}
          
          <Button onClick={handleDeactivateBarrier}>解除屏障</Button>
        </ActiveBarrierInfo>
      ) : showConfirmation ? (
        <ConfirmationBox>
          <ConfirmationMessage>
            你确定要激活专注屏障吗？这将屏蔽所有干扰应用和网站一段时间。
          </ConfirmationMessage>
          <ButtonGroup>
            <Button onClick={handleCancelActivation}>取消</Button>
            <Button primary onClick={handleConfirmActivation}>确认激活</Button>
          </ButtonGroup>
        </ConfirmationBox>
      ) : (
        <>
          <Title>专注屏障</Title>
          <Description>
            专注屏障可以帮助你在工作时屏蔽所有干扰，包括社交媒体和通知。
            设置屏障后，你将无法访问这些干扰源直到设定的时间结束。
          </Description>
          
          <BarrierSettings>
            <SettingItem>
              <div>
                <SettingLabel>屏障持续时间</SettingLabel>
                <SettingDescription>设置屏障将持续多长时间</SettingDescription>
              </div>
              <Input 
                type="number" 
                value={blockDuration}
                min="5"
                max="180" 
                onChange={(e) => setBlockDuration(parseInt(e.target.value, 10))}
              /> 分钟
            </SettingItem>
            
            <SettingItem>
              <div>
                <SettingLabel>屏障强度</SettingLabel>
                <SettingDescription>设置要屏蔽的内容级别</SettingDescription>
              </div>
              <Select 
                value={blockLevel}
                onChange={(e) => setBlockLevel(e.target.value)}
              >
                <option value="light">轻度（仅社交媒体）</option>
                <option value="medium">中度（社交媒体和娱乐网站）</option>
                <option value="strict">严格（除工作网站外的所有内容）</option>
              </Select>
            </SettingItem>
            
            <SettingItem>
              <div>
                <SettingLabel>显示倒计时</SettingLabel>
                <SettingDescription>在屏障激活时显示倒计时</SettingDescription>
              </div>
              <Toggle>
                <input 
                  type="checkbox" 
                  checked={timerEnabled} 
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                />
                <span />
              </Toggle>
            </SettingItem>
          </BarrierSettings>
          
          <Button primary onClick={handleActivateBarrier}>激活专注屏障</Button>
        </>
      )}
    </BarrierContainer>
  );
};

export default BarrierPage; 