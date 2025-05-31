// 🔁 Hot reload
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
  ignored: [
    /node_modules|[/\\]\./,
    'src/output.css' // Ignore Tailwind's output file
  ]
});

// ⚙️ Electron setup
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: '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', // <--- KEEP THIS SECRET
});


function createWindow () {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    resizable: false, // 🔒 Prevent resizing
    webPreferences: {
         preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
      nodeIntegration: true,
    }
  });

  win.removeMenu(); // 🧭 Remove default menu
  win.loadFile(path.join(__dirname, 'src', 'index.html'));
}


ipcMain.handle('send-message', async (event, userMessage) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: userMessage }],
  });

  return completion.choices[0].message.content;
});

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
