const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const auth = require('./src/js/auth');
const dashboard = require('./src/js/dashboard');
const members = require('./src/js/members');

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

  // Cargar la página de inicio de sesión
  mainWindow.loadFile('src/index.html');
  mainWindow.on('closed', () => (mainWindow = null));
}

// Manejador para el inicio de sesión
ipcMain.handle('login', async (event, username, password) => {
  try {
    const result = await auth.login(username, password);
    return result;
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    return { success: false, message: 'Error interno' };
  }
});

// Manejador para obtener datos del dashboard
ipcMain.handle('getDashboardData', async () => {
  try {
    const data = await dashboard.getDashboardData();
    return data;
  } catch (error) {
    console.error('Error al obtener datos del dashboard:', error);
    return { success: false, message: 'Error interno' };
  }
});

// Manejador para obtener miembros
ipcMain.handle('getMembers', async () => {
  try {
    const data = await members.getMembers();
    return data;
  } catch (error) {
    console.error('Error al obtener miembros:', error);
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