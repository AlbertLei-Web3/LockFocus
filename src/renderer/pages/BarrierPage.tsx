import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

const BarrierPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  color: ${props => props.theme.headingColor};
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: 500;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const BarrierSection = styled.section`
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-lg);
`;

const BarrierList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
`;

const BarrierItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.theme.backgroundColor};
  border: 1px solid var(--border-color-light);
`;

const BarrierInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const BarrierName = styled.div`
  font-weight: 500;
`;

const BarrierDescription = styled.div`
  font-size: var(--font-size-sm);
  color: ${props => props.theme.textColorLight};
`;

const BarrierControls = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const BarrierButton = styled(Button)`
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
`;

const DeleteButton = styled(BarrierButton)`
  background-color: var(--danger-color);
  
  &:hover {
    background-color: #dc2626;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
  
  h3 {
    margin-bottom: var(--spacing-md);
    color: ${props => props.theme.textColor};
  }
  
  p {
    color: ${props => props.theme.textColorLight};
    margin-bottom: var(--spacing-lg);
    max-width: 500px;
  }
`;

// 模拟的屏障数据
const mockBarriers = [
  {
    id: '1',
    name: '社交媒体阻止',
    description: '在番茄钟期间阻止访问社交媒体网站',
    active: true,
    blockedSites: ['facebook.com', 'twitter.com', 'instagram.com']
  },
  {
    id: '2',
    name: '游戏阻止',
    description: '在番茄钟期间阻止打开游戏应用',
    active: false,
    blockedApps: ['steam.exe', 'epicgames.exe', 'leagueoflegends.exe']
  }
];

const BarrierPage: React.FC = () => {
  const [barriers, setBarriers] = useState(mockBarriers);
  
  const toggleBarrier = (id: string) => {
    setBarriers(prevBarriers => 
      prevBarriers.map(barrier => 
        barrier.id === id ? { ...barrier, active: !barrier.active } : barrier
      )
    );
  };
  
  const deleteBarrier = (id: string) => {
    setBarriers(prevBarriers => prevBarriers.filter(barrier => barrier.id !== id));
  };
  
  return (
    <BarrierPageContainer>
      <PageHeader>
        <Title>专注屏障</Title>
        <Button>添加屏障</Button>
      </PageHeader>
      
      <BarrierSection>
        {barriers.length > 0 ? (
          <BarrierList>
            {barriers.map(barrier => (
              <BarrierItem key={barrier.id}>
                <BarrierInfo>
                  <BarrierName>{barrier.name}</BarrierName>
                  <BarrierDescription>{barrier.description}</BarrierDescription>
                </BarrierInfo>
                
                <BarrierControls>
                  <BarrierButton 
                    onClick={() => toggleBarrier(barrier.id)}
                    style={{ backgroundColor: barrier.active ? 'var(--success-color)' : 'var(--text-gray)' }}
                  >
                    {barrier.active ? '已启用' : '已禁用'}
                  </BarrierButton>
                  <BarrierButton>编辑</BarrierButton>
                  <DeleteButton onClick={() => deleteBarrier(barrier.id)}>删除</DeleteButton>
                </BarrierControls>
              </BarrierItem>
            ))}
          </BarrierList>
        ) : (
          <EmptyState>
            <h3>还没有专注屏障</h3>
            <p>
              专注屏障可以帮助你在番茄钟期间保持专注，
              阻止分心的网站和应用程序。
            </p>
            <Button>创建第一个屏障</Button>
          </EmptyState>
        )}
      </BarrierSection>
    </BarrierPageContainer>
  );
};

export default BarrierPage; 