// 预加载脚本允许在渲染进程中执行Node.js API
// 这里可以为渲染进程提供一些特定功能的接口
import { contextBridge, ipcRenderer } from 'electron';

// 暴露给渲染进程的API
contextBridge.exposeInMainWorld('electron', {
  // 基本通信
  send: (channel: string, data?: any) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  
  // 专注屏障功能
  blockApp: (appName: string) => {
    ipcRenderer.send('block-app', appName);
  },
  blockWebsite: (website: string) => {
    ipcRenderer.send('block-website', website);
  },

  // 应用功能
  quitApp: () => {
    ipcRenderer.send('app-quit');
  }
}); 