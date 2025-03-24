import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum NotificationLevel {
  ALL = 'all',
  IMPORTANT = 'important',
  NONE = 'none',
}

interface SettingsSliceState {
  theme: ThemeMode;
  autoStartBreak: boolean;
  autoStartNextPomodoro: boolean;
  notificationLevel: NotificationLevel;
  notificationSounds: boolean;
  startOnBoot: boolean;
  minimizeToTray: boolean;
  language: string;
  emergencyUnlocksPerDay: number;
}

const initialState: SettingsSliceState = {
  theme: ThemeMode.SYSTEM,
  autoStartBreak: true,
  autoStartNextPomodoro: false,
  notificationLevel: NotificationLevel.ALL,
  notificationSounds: true,
  startOnBoot: false,
  minimizeToTray: true,
  language: 'zh-CN',
  emergencyUnlocksPerDay: 3,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setAutoStartBreak: (state, action: PayloadAction<boolean>) => {
      state.autoStartBreak = action.payload;
    },
    setAutoStartNextPomodoro: (state, action: PayloadAction<boolean>) => {
      state.autoStartNextPomodoro = action.payload;
    },
    setNotificationLevel: (state, action: PayloadAction<NotificationLevel>) => {
      state.notificationLevel = action.payload;
    },
    setNotificationSounds: (state, action: PayloadAction<boolean>) => {
      state.notificationSounds = action.payload;
    },
    setStartOnBoot: (state, action: PayloadAction<boolean>) => {
      state.startOnBoot = action.payload;
    },
    setMinimizeToTray: (state, action: PayloadAction<boolean>) => {
      state.minimizeToTray = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setEmergencyUnlocksPerDay: (state, action: PayloadAction<number>) => {
      state.emergencyUnlocksPerDay = action.payload;
    },
    resetSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  setTheme,
  setAutoStartBreak,
  setAutoStartNextPomodoro,
  setNotificationLevel,
  setNotificationSounds,
  setStartOnBoot,
  setMinimizeToTray,
  setLanguage,
  setEmergencyUnlocksPerDay,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer; 