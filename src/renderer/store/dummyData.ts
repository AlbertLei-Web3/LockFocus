import { PomodoroTask } from './slices/tasksSlice';

// 获取当前时间戳
const now = Date.now();
// 一天的毫秒数
const day = 24 * 60 * 60 * 1000;

// 创建模拟任务数据
export const dummyTasks: PomodoroTask[] = [
  {
    id: '1',
    name: '完成项目文档',
    isCompleted: true,
    tags: ['工作', '写作'],
    startTime: now - 2 * day,
    endTime: now - 2 * day + 2 * 60 * 60 * 1000,
    estimatedPomodoros: 4,
    actualPomodoros: 5,
    notes: '文档初稿已完成，需要进行修订'
  },
  {
    id: '2',
    name: '学习React Hooks',
    isCompleted: true,
    tags: ['学习', '编程'],
    startTime: now - 1 * day,
    endTime: now - 1 * day + 90 * 60 * 1000,
    estimatedPomodoros: 2,
    actualPomodoros: 3,
    notes: '完成了useEffect和useState的学习'
  },
  {
    id: '3',
    name: '阅读《原子习惯》',
    isCompleted: false,
    tags: ['阅读', '自我提升'],
    startTime: now - 12 * 60 * 60 * 1000,
    endTime: null,
    estimatedPomodoros: 6,
    actualPomodoros: 2,
    notes: '已阅读到第三章'
  },
  {
    id: '4',
    name: '健身锻炼',
    isCompleted: true,
    tags: ['健康'],
    startTime: now - 4 * 60 * 60 * 1000,
    endTime: now - 3 * 60 * 60 * 1000,
    estimatedPomodoros: 1,
    actualPomodoros: 1,
    notes: '完成了30分钟的有氧运动'
  },
  {
    id: '5',
    name: '复习英语单词',
    isCompleted: false,
    tags: ['学习', '语言'],
    startTime: now - 60 * 60 * 1000,
    endTime: null,
    estimatedPomodoros: 2,
    actualPomodoros: 1,
    notes: '复习了100个单词'
  }
]; 