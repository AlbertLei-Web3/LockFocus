import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
  accentColor: string;
}

const initialState: ThemeState = {
  darkMode: false,
  accentColor: '#4f46e5', // 默认颜色
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    }
  },
});

export const { toggleTheme, setAccentColor } = themeSlice.actions;
export default themeSlice.reducer; 