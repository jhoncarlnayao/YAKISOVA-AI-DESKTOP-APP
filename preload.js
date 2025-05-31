const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('chatAPI', {
  sendMessage: (message) => ipcRenderer.invoke('send-message', message),
});
