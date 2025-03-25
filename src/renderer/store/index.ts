import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import timerReducer from './slices/timerSlice';
import tasksReducer from './slices/tasksSlice';
import barrierReducer from './slices/barrierSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    timer: timerReducer,
    tasks: tasksReducer,
    barrier: barrierReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 