import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColor: string;
    cardBackground: string;
    headingColor: string;
    textColor: string;
    textColorLight: string;
    sidebarBackground: string;
    accentColor: string;
  }
} 