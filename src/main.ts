import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // aqui vai o preload
    },
  });

  win.loadFile('dist/index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('list-files', async (_event, folderPath: string) => {
  try {
    const files = await fs.promises.readdir(folderPath);
    return files;
  } catch (err: any) {
    return { error: err.message };
  }
});
