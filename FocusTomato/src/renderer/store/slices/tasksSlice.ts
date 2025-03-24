import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PomodoroTask {
  id: string;
  name: string;
  isCompleted: boolean;
  tags: string[];
  startTime: number;
  endTime: number | null;
  estimatedPomodoros: number;
  actualPomodoros: number;
  notes: string;
}

interface TasksState {
  tasks: PomodoroTask[];
  currentTask: string | null;
}

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<PomodoroTask, 'id'>>) => {
      const newTask = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.tasks.push(newTask);
    },
    
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<PomodoroTask> }>) => {
      const { id, updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },
    
    completeTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      
      if (task) {
        task.isCompleted = true;
        task.endTime = Date.now();
      }
    },
    
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    
    setCurrentTask: (state, action: PayloadAction<string | null>) => {
      state.currentTask = action.payload;
    },
    
    incrementTaskPomodoro: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      
      if (task) {
        task.actualPomodoros += 1;
      }
    },
  },
});

export const { 
  addTask, 
  updateTask, 
  completeTask, 
  deleteTask, 
  setCurrentTask,
  incrementTaskPomodoro 
} = tasksSlice.actions;

export default tasksSlice.reducer; 