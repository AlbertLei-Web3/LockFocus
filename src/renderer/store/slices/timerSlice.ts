import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TimerStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  PAUSED = 'paused',
  BREAK = 'break',
}

export enum TimerType {
  FOCUS = 'focus',
  BREAK = 'break',
  LONG_BREAK = 'longBreak',
}

interface TimerState {
  status: TimerStatus;
  type: TimerType;
  timeRemaining: number; // 剩余时间，单位是秒
  initialTime: number; // 初始设置的时间，单位是秒
  completedPomodoros: number; // 完成的番茄钟数量
  focusTimeMinutes: number; // 专注时长，分钟
  breakTimeMinutes: number; // 休息时长，分钟
  longBreakTimeMinutes: number; // 长休息时长，分钟
  longBreakInterval: number; // 多少个番茄钟后进行长休息
  autoStartBreaks: boolean; // 是否自动开始休息
  autoStartPomodoros: boolean; // 是否自动开始下一个番茄钟
  totalFocusedToday: number; // 今日专注总时长，秒
}

const initialState: TimerState = {
  status: TimerStatus.IDLE,
  type: TimerType.FOCUS,
  timeRemaining: 25 * 60, // 默认25分钟
  initialTime: 25 * 60,
  completedPomodoros: 0,
  focusTimeMinutes: 25,
  breakTimeMinutes: 5,
  longBreakTimeMinutes: 15,
  longBreakInterval: 4,
  autoStartBreaks: true,
  autoStartPomodoros: false,
  totalFocusedToday: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer: (state) => {
      state.status = TimerStatus.RUNNING;
    },
    pauseTimer: (state) => {
      state.status = TimerStatus.PAUSED;
    },
    resetTimer: (state) => {
      state.status = TimerStatus.IDLE;
      state.timeRemaining = state.initialTime;
    },
    tick: (state) => {
      if (state.status === TimerStatus.RUNNING && state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },
    completePomodoro: (state) => {
      state.completedPomodoros += 1;
      state.totalFocusedToday += state.initialTime;
      
      // 检查是否应该进入长休息
      if (state.completedPomodoros % state.longBreakInterval === 0) {
        state.type = TimerType.LONG_BREAK;
        state.initialTime = state.longBreakTimeMinutes * 60;
      } else {
        state.type = TimerType.BREAK;
        state.initialTime = state.breakTimeMinutes * 60;
      }
      
      state.timeRemaining = state.initialTime;
      state.status = state.autoStartBreaks ? TimerStatus.RUNNING : TimerStatus.IDLE;
    },
    completeBreak: (state) => {
      state.type = TimerType.FOCUS;
      state.initialTime = state.focusTimeMinutes * 60;
      state.timeRemaining = state.initialTime;
      state.status = state.autoStartPomodoros ? TimerStatus.RUNNING : TimerStatus.IDLE;
    },
    updateTimerSettings: (state, action: PayloadAction<Partial<TimerState>>) => {
      const newState = { ...state, ...action.payload };
      
      // 如果更新了时长设置，且计时器当前是空闲状态，则更新当前剩余时间
      if (
        state.status === TimerStatus.IDLE && 
        (action.payload.focusTimeMinutes || action.payload.breakTimeMinutes || action.payload.longBreakTimeMinutes)
      ) {
        if (state.type === TimerType.FOCUS && action.payload.focusTimeMinutes) {
          newState.initialTime = action.payload.focusTimeMinutes * 60;
          newState.timeRemaining = newState.initialTime;
        } else if (state.type === TimerType.BREAK && action.payload.breakTimeMinutes) {
          newState.initialTime = action.payload.breakTimeMinutes * 60;
          newState.timeRemaining = newState.initialTime;
        } else if (state.type === TimerType.LONG_BREAK && action.payload.longBreakTimeMinutes) {
          newState.initialTime = action.payload.longBreakTimeMinutes * 60;
          newState.timeRemaining = newState.initialTime;
        }
      }
      
      return newState;
    }
  },
});

export const { 
  startTimer, 
  pauseTimer, 
  resetTimer, 
  tick, 
  completePomodoro, 
  completeBreak,
  updateTimerSettings
} = timerSlice.actions;

export default timerSlice.reducer; 