const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  login: (username, password) => ipcRenderer.invoke('login', username, password),
  getMembers: () => ipcRenderer.invoke('getMembers'),
  addMember: (member) => ipcRenderer.invoke('addMember', member),
});