import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BarrierState {
  isActive: boolean;
  duration: number; // in minutes
  blockSites: boolean;
  allowTimer: boolean;
}

const initialState: BarrierState = {
  isActive: false,
  duration: 30, // default 30 minutes
  blockSites: true,
  allowTimer: true,
};

const barrierSlice = createSlice({
  name: 'barrier',
  initialState,
  reducers: {
    updateBarrierStatus: (state, action: PayloadAction<Partial<BarrierState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateBarrierStatus } = barrierSlice.actions;
export default barrierSlice.reducer; 