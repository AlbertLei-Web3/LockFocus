import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';
import { updateTimerSettings } from '../store/slices/timerSlice';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const SettingsSection = styled.section`
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-md);
  color: ${props => props.theme.headingColor};
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--spacing-sm);
`;

const SettingGroup = styled.div`
  margin-bottom: var(--spacing-lg);
  
  &:last-child {
    margin-bottom: 0;
  }
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

const SettingControl = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 80px;
  padding: var(--spacing-sm);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  text-align: center;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
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

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { focusTimeMinutes, breakTimeMinutes, longBreakTimeMinutes, 
          longBreakInterval, autoStartBreaks, autoStartPomodoros } = useSelector((state: RootState) => state.timer);
  
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  const handleTimerSettingChange = (setting: string, value: number | boolean) => {
    dispatch(updateTimerSettings({ [setting]: value }));
  };
  
  return (
    <SettingsContainer>
      <SettingsSection>
        <SectionTitle>外观</SectionTitle>
        <SettingGroup>
          <SettingItem>
            <div>
              <SettingLabel>深色模式</SettingLabel>
              <SettingDescription>切换浅色/深色主题</SettingDescription>
            </div>
            <SettingControl>
              <Toggle>
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={handleThemeToggle}
                />
                <span />
              </Toggle>
            </SettingControl>
          </SettingItem>
        </SettingGroup>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>计时器</SectionTitle>
        <SettingGroup>
          <SettingItem>
            <div>
              <SettingLabel>专注时长（分钟）</SettingLabel>
              <SettingDescription>每个番茄钟的专注时长</SettingDescription>
            </div>
            <SettingControl>
              <Input 
                type="number" 
                value={focusTimeMinutes} 
                min="1"
                max="120"
                onChange={(e) => handleTimerSettingChange('focusTimeMinutes', parseInt(e.target.value, 10))}
              />
            </SettingControl>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>休息时长（分钟）</SettingLabel>
              <SettingDescription>短休息的时长</SettingDescription>
            </div>
            <SettingControl>
              <Input 
                type="number" 
                value={breakTimeMinutes}
                min="1"
                max="30" 
                onChange={(e) => handleTimerSettingChange('breakTimeMinutes', parseInt(e.target.value, 10))}
              />
            </SettingControl>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>长休息时长（分钟）</SettingLabel>
              <SettingDescription>完成多个番茄钟后的长休息时长</SettingDescription>
            </div>
            <SettingControl>
              <Input 
                type="number" 
                value={longBreakTimeMinutes}
                min="1"
                max="60" 
                onChange={(e) => handleTimerSettingChange('longBreakTimeMinutes', parseInt(e.target.value, 10))}
              />
            </SettingControl>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>长休息间隔</SettingLabel>
              <SettingDescription>多少个番茄钟后进行长休息</SettingDescription>
            </div>
            <SettingControl>
              <Input 
                type="number" 
                value={longBreakInterval}
                min="1"
                max="10" 
                onChange={(e) => handleTimerSettingChange('longBreakInterval', parseInt(e.target.value, 10))}
              />
            </SettingControl>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>自动开始休息</SettingLabel>
              <SettingDescription>专注结束后自动开始休息</SettingDescription>
            </div>
            <SettingControl>
              <Toggle>
                <input 
                  type="checkbox" 
                  checked={autoStartBreaks} 
                  onChange={(e) => handleTimerSettingChange('autoStartBreaks', e.target.checked)}
                />
                <span />
              </Toggle>
            </SettingControl>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>自动开始专注</SettingLabel>
              <SettingDescription>休息结束后自动开始下一个番茄钟</SettingDescription>
            </div>
            <SettingControl>
              <Toggle>
                <input 
                  type="checkbox" 
                  checked={autoStartPomodoros} 
                  onChange={(e) => handleTimerSettingChange('autoStartPomodoros', e.target.checked)}
                />
                <span />
              </Toggle>
            </SettingControl>
          </SettingItem>
        </SettingGroup>
      </SettingsSection>
      
      <SettingsSection>
        <SectionTitle>数据</SectionTitle>
        <SettingGroup>
          <SettingItem>
            <div>
              <SettingLabel>导出数据</SettingLabel>
              <SettingDescription>将你的任务历史导出为JSON文件</SettingDescription>
            </div>
            <SettingControl>
              <Button>导出</Button>
            </SettingControl>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>清除所有数据</SettingLabel>
              <SettingDescription>删除所有任务记录和设置（不可恢复）</SettingDescription>
            </div>
            <SettingControl>
              <Button style={{ backgroundColor: 'var(--danger-color)' }}>清除</Button>
            </SettingControl>
          </SettingItem>
        </SettingGroup>
      </SettingsSection>
    </SettingsContainer>
  );
};

export default SettingsPage; 