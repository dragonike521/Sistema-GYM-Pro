const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  login: (username, password) => ipcRenderer.invoke('login', username, password),
  getDashboardData: () => ipcRenderer.invoke('getDashboardData'),
  getMembers: () => ipcRenderer.invoke('getMembers'),
});