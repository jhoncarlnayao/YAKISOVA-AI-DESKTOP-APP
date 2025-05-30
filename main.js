// 🔁 Hot reload
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
  ignored: [
    /node_modules|[/\\]\./,
    'src/output.css' // Ignore Tailwind's output file
  ]
});

// ⚙️ Electron setup
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    resizable: false, // 🔒 Prevent resizing
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    }
  });

  win.removeMenu(); // 🧭 Remove default menu
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}

// 🕒 App ready
app.whenReady().then(createWindow);

// 🔁 macOS: Reopen window if none open and app is re-activated
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// ❌ Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
