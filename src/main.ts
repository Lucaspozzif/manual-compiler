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

// IPC para listar arquivos
ipcMain.handle('list-files', async (_, dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  const matchingFiles = files.filter(file =>
    /^[A-Z]{3}0+(\d+)(\d{4})$/.test(file)
  ).map(file => {
    const match = file.match(/^([A-Z]{3})0+(\d+)(\d{4})$/);
    if (match) {
      return {
        prefix: match[1],
        code: match[2].replace(/^0+/, ''),
        version: match[3].replace(/^0+/, ''),
      };
    }
    return null;
  }).filter(Boolean);

  return matchingFiles;
});
