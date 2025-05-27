const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  listFiles: (dirPath: any) => ipcRenderer.invoke('list-files', dirPath)
});
