import React, { useState } from 'react';

declare global {
  interface Window {
    electronAPI: {
      listFiles: (dirPath: string) => Promise<any[]>;
    };
  }
}

export const TempReader: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [dirPath, setDirPath] = useState<string>('C:\\Temp');

  const handleListFiles = async () => {
    const result = await window.electronAPI.listFiles(dirPath);
    setFiles(result);
    console.log(result)
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Arquivos Encontrados</h1>
      <input
        className="border p-2 mr-2"
        type="text"
        value={dirPath}
        onChange={(e) => setDirPath(e.target.value)}
        placeholder="Caminho da pasta"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleListFiles}
      >
        Listar Arquivos
      </button>
      <ul className="mt-4">
        {files.map((file, idx) => (
          <li key={idx}>
            {file.prefix} - Código: {file.code}, Versão: {file.version}
          </li>
        ))}
      </ul>
    </div>
  );
};
