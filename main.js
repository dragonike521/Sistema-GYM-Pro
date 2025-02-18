const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const auth = require('./src/js/auth');
const members = require('./src/js/members');
const payments = require('./src/js/payments');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('src/index.html');
  mainWindow.on('closed', () => (mainWindow = null));
}

ipcMain.handle('login', async (event, username, password) => {
  try {
    const result = await auth.login(username, password);
    return result;
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    return { success: false, message: 'Error interno' };
  }
});

ipcMain.handle('getMembers', async () => {
  try {
    const data = await members.getMembers();
    return data;
  } catch (error) {
    console.error('Error al obtener miembros:', error);
    return { success: false, message: 'Error interno' };
  }
});

ipcMain.handle('addMember', async (event, member) => {
  try {
    const result = await members.addMember(member);
    return result;
  } catch (error) {
    console.error('Error al agregar miembro:', error);
    return { success: false, message: 'Error interno' };
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});