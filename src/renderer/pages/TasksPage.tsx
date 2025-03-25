import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const TasksPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
`;

const FilterLabel = styled.div`
  font-weight: 500;
  margin-right: var(--spacing-sm);
`;

const FilterSelect = styled.select`
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
`;

const SearchInput = styled.input`
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border-color);
  margin-left: auto;
  min-width: 250px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-light);
  }
`;

const TasksTable = styled.div`
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: var(--spacing-md);
  background-color: ${props => props.theme.cardBackground};
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color-light);
  background-color: ${props => props.theme.cardBackground};
  transition: background-color var(--transition-fast);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TaskName = styled.div`
  font-weight: 500;
`;

const TaskTags = styled.div`
  display: flex;
  gap: var(--spacing-xs);
`;

const Tag = styled.span`
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: 2px 8px;
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxl);
  background-color: ${props => props.theme.cardBackground};
  border-radius: var(--border-radius-md);
  text-align: center;
  
  h3 {
    margin-bottom: var(--spacing-md);
    color: ${props => props.theme.textColor};
  }
  
  p {
    color: ${props => props.theme.textColorLight};
    max-width: 500px;
  }
`;

// 格式化日期时间
const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const TasksPage: React.FC = () => {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [timeFilter, setTimeFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 获取所有唯一的标签
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    tasks.forEach(task => {
      task.tags.forEach(tag => tagSet.add(tag));
    });
    return ['all', ...Array.from(tagSet)];
  }, [tasks]);
  
  // 根据筛选条件过滤任务
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        // 时间筛选
        if (timeFilter === 'today') {
          const taskDate = new Date(task.startTime);
          const today = new Date();
          return taskDate.getDate() === today.getDate() &&
                 taskDate.getMonth() === today.getMonth() &&
                 taskDate.getFullYear() === today.getFullYear();
        } else if (timeFilter === 'week') {
          const taskDate = new Date(task.startTime);
          const today = new Date();
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          return taskDate >= weekAgo;
        } else if (timeFilter === 'month') {
          const taskDate = new Date(task.startTime);
          const today = new Date();
          const monthAgo = new Date();
          monthAgo.setMonth(today.getMonth() - 1);
          return taskDate >= monthAgo;
        }
        return true;
      })
      .filter(task => {
        // 标签筛选
        if (tagFilter !== 'all') {
          return task.tags.includes(tagFilter);
        }
        return true;
      })
      .filter(task => {
        // 搜索筛选
        if (searchTerm) {
          return task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 task.notes.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
      })
      // 按开始时间倒序排序
      .sort((a, b) => b.startTime - a.startTime);
  }, [tasks, timeFilter, tagFilter, searchTerm]);
  
  return (
    <TasksPageContainer>
      <FilterSection>
        <FilterLabel>时间范围:</FilterLabel>
        <FilterSelect
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">全部时间</option>
          <option value="today">今天</option>
          <option value="week">本周</option>
          <option value="month">本月</option>
        </FilterSelect>
        
        <FilterLabel>标签:</FilterLabel>
        <FilterSelect
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        >
          {allTags.map(tag => (
            <option key={tag} value={tag}>
              {tag === 'all' ? '全部标签' : tag}
            </option>
          ))}
        </FilterSelect>
        
        <SearchInput
          type="text"
          placeholder="搜索任务..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FilterSection>
      
      {filteredTasks.length > 0 ? (
        <TasksTable>
          <TableHeader>
            <div>任务名称</div>
            <div>标签</div>
            <div>开始时间</div>
            <div>状态</div>
            <div>番茄数</div>
          </TableHeader>
          
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TaskName>{task.name}</TaskName>
              <TaskTags>
                {task.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TaskTags>
              <div>{formatDateTime(task.startTime)}</div>
              <div>{task.isCompleted ? '已完成' : '进行中'}</div>
              <div>{task.actualPomodoros}/{task.estimatedPomodoros}</div>
            </TableRow>
          ))}
        </TasksTable>
      ) : (
        <EmptyState>
          <h3>暂无任务记录</h3>
          <p>
            开始您的第一个番茄时钟，任务记录将在这里显示。
            您可以通过筛选和搜索功能快速找到过去的任务。
          </p>
        </EmptyState>
      )}
    </TasksPageContainer>
  );
};

export default TasksPage; 