import { DefaultTheme } from 'styled-components';

// 浅色主题
export const lightTheme: DefaultTheme = {
  backgroundColor: 'var(--background-light)',
  cardBackground: 'white',
  headingColor: 'var(--text-dark)',
  textColor: 'var(--text-dark)',
  textColorLight: 'var(--text-gray)',
  sidebarBackground: '#f5f5f5',
  accentColor: 'var(--primary-color)',
};

// 深色主题
export const darkTheme: DefaultTheme = {
  backgroundColor: 'var(--background-dark)',
  cardBackground: '#27272a',
  headingColor: 'var(--text-light)',
  textColor: 'var(--text-light)',
  textColorLight: '#a1a1aa',
  sidebarBackground: '#27272a',
  accentColor: 'var(--primary-color)',
}; 