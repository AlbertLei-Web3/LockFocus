interface ElectronAPI {
  send: (channel: string, data?: any) => void;
  receive: (channel: string, func: (...args: any[]) => void) => void;
  blockApp: (appName: string) => void;
  blockWebsite: (website: string) => void;
  quitApp: () => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
} 