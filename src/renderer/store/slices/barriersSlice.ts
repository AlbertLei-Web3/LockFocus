import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BlockedApp {
  id: string;
  name: string;
  processName: string;
  isActive: boolean;
}

export interface BlockedWebsite {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
}

export interface BarrierAttempt {
  id: string;
  timestamp: number;
  type: 'app' | 'website';
  target: string;
}

interface BarriersSliceState {
  blockedApps: BlockedApp[];
  blockedWebsites: BlockedWebsite[];
  isBarrierActive: boolean;
  emergencyUnlocksUsedToday: number;
  lastEmergencyUnlockDate: string | null;
  barrierAttempts: BarrierAttempt[];
}

// 获取当前日期的字符串表示（YYYY-MM-DD）
const getCurrentDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const initialState: BarriersSliceState = {
  blockedApps: [
    { id: '1', name: '微信', processName: 'WeChat.exe', isActive: true },
    { id: '2', name: '游戏平台', processName: 'Steam.exe', isActive: true },
    { id: '3', name: 'QQ', processName: 'QQ.exe', isActive: true },
  ],
  blockedWebsites: [
    { id: '1', name: '微博', url: 'weibo.com', isActive: true },
    { id: '2', name: '哔哩哔哩', url: 'bilibili.com', isActive: true },
    { id: '3', name: '知乎', url: 'zhihu.com', isActive: true },
  ],
  isBarrierActive: false,
  emergencyUnlocksUsedToday: 0,
  lastEmergencyUnlockDate: null,
  barrierAttempts: [],
};

export const barriersSlice = createSlice({
  name: 'barriers',
  initialState,
  reducers: {
    addBlockedApp: (state, action: PayloadAction<Omit<BlockedApp, 'id'>>) => {
      const id = Date.now().toString();
      state.blockedApps.push({ id, ...action.payload });
    },
    removeBlockedApp: (state, action: PayloadAction<string>) => {
      state.blockedApps = state.blockedApps.filter(app => app.id !== action.payload);
    },
    toggleAppBlock: (state, action: PayloadAction<string>) => {
      const app = state.blockedApps.find(app => app.id === action.payload);
      if (app) {
        app.isActive = !app.isActive;
      }
    },
    addBlockedWebsite: (state, action: PayloadAction<Omit<BlockedWebsite, 'id'>>) => {
      const id = Date.now().toString();
      state.blockedWebsites.push({ id, ...action.payload });
    },
    removeBlockedWebsite: (state, action: PayloadAction<string>) => {
      state.blockedWebsites = state.blockedWebsites.filter(website => website.id !== action.payload);
    },
    toggleWebsiteBlock: (state, action: PayloadAction<string>) => {
      const website = state.blockedWebsites.find(website => website.id === action.payload);
      if (website) {
        website.isActive = !website.isActive;
      }
    },
    activateBarrier: (state) => {
      state.isBarrierActive = true;
    },
    deactivateBarrier: (state) => {
      state.isBarrierActive = false;
    },
    recordBarrierAttempt: (state, action: PayloadAction<Omit<BarrierAttempt, 'id'>>) => {
      const id = Date.now().toString();
      state.barrierAttempts.push({ id, ...action.payload });
    },
    useEmergencyUnlock: (state) => {
      const currentDate = getCurrentDateString();
      
      // 检查是否是新的一天
      if (state.lastEmergencyUnlockDate !== currentDate) {
        state.emergencyUnlocksUsedToday = 0;
        state.lastEmergencyUnlockDate = currentDate;
      }
      
      state.emergencyUnlocksUsedToday += 1;
      state.isBarrierActive = false;
    },
    resetBarrierAttempts: (state) => {
      state.barrierAttempts = [];
    },
    importBlockedItems: (state, action: PayloadAction<{
      apps?: BlockedApp[];
      websites?: BlockedWebsite[];
    }>) => {
      const { apps, websites } = action.payload;
      
      if (apps) {
        state.blockedApps = [...state.blockedApps, ...apps];
      }
      
      if (websites) {
        state.blockedWebsites = [...state.blockedWebsites, ...websites];
      }
    },
  },
});

export const {
  addBlockedApp,
  removeBlockedApp,
  toggleAppBlock,
  addBlockedWebsite,
  removeBlockedWebsite,
  toggleWebsiteBlock,
  activateBarrier,
  deactivateBarrier,
  recordBarrierAttempt,
  useEmergencyUnlock,
  resetBarrierAttempts,
  importBlockedItems,
} = barriersSlice.actions;

export default barriersSlice.reducer; 