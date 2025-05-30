import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  listFiles: (folderPath: string) => ipcRenderer.invoke('list-files', folderPath),
});
