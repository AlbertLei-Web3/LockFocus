import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* 颜色变量 */
    --primary-color: #4f46e5;
    --primary-dark: #4338ca;
    --primary-light: #e0e7ff;
    --primary-rgb: 79, 70, 229;
    
    --secondary-color: #06b6d4;
    --secondary-dark: #0891b2;
    --secondary-light: #cffafe;
    
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    
    --background-light: #f9fafb;
    --background-dark: #18181b;
    
    --text-dark: #111827;
    --text-light: #f9fafb;
    --text-gray: #6b7280;
    
    --border-color: rgba(0, 0, 0, 0.1);
    --border-color-light: rgba(0, 0, 0, 0.05);
    
    /* 间距变量 */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;
    
    /* 字体大小 */
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 24px;
    --font-size-xxl: 32px;
    
    /* 圆角 */
    --border-radius-sm: 4px;
    --border-radius-md: 6px;
    --border-radius-lg: 8px;
    --border-radius-full: 9999px;
    
    /* 阴影 */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    
    /* 过渡 */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
  }
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: var(--font-size-md);
    line-height: 1.5;
    overflow: hidden;
  }
  
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-weight: 600;
    line-height: 1.2;
  }
  
  p {
    margin-top: 0;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`; 