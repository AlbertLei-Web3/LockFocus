import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import * as path from 'path';
const isDev = require('electron-is-dev');

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 加载app
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:9000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // 打开开发者工具
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));
  
  // 创建系统托盘
  createTray();
}

function createTray() {
  tray = new Tray(path.join(__dirname, '../renderer/assets/tray-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开 FocusTomato', click: () => { if (mainWindow) mainWindow.show(); } },
    { type: 'separator' },
    { label: '开始番茄', click: () => { if (mainWindow) mainWindow.webContents.send('start-timer'); } },
    { label: '暂停', click: () => { if (mainWindow) mainWindow.webContents.send('pause-timer'); } },
    { label: '停止', click: () => { if (mainWindow) mainWindow.webContents.send('stop-timer'); } },
    { type: 'separator' },
    { label: '退出', click: () => app.quit() }
  ]);
  
  tray.setToolTip('FocusTomato');
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(createWindow);

// 在macOS上，当单击dock图标并且没有其他窗口打开时，
// 通常在应用程序中重新创建一个窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 当所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 在这里，您可以包含应用程序特定的主进程代码
// 您也可以将它们放在单独的文件中，并在这里导入

// 处理IPC消息
ipcMain.on('app-quit', () => {
  app.quit();
});

// 应用屏蔽相关IPC处理
ipcMain.on('block-app', (event, appName) => {
  // 实现应用程序屏蔽逻辑
  console.log(`Blocking app: ${appName}`);
  // 这里需要实现实际的应用屏蔽功能
});

// 网站屏蔽相关IPC处理
ipcMain.on('block-website', (event, website) => {
  // 实现网站屏蔽逻辑
  console.log(`Blocking website: ${website}`);
  // 这里需要实现通过修改hosts文件的网站屏蔽功能
}); 