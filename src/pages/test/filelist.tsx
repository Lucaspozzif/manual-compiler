import React, { useState } from 'react';

declare global {
    interface Window {
        api: {
            listFiles: (folderPath: string) => Promise<string[] | { error: string }>;
        };
    }
}

export const FileList: React.FC = () => {
    const [folderPath, setFolderPath] = useState('C:/Temp'); // <- Aqui você muda o caminho
    const [files, setFiles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleListFiles = async () => {
        const result = await window.api.listFiles(folderPath);
        if ('error' in result) {
            setError(result.error);
            setFiles([]);
        } else {
            setFiles(result);
            setError(null);
        }
    };
    return (
        <div>
            <h1>Arquivos na pasta</h1>
            <input
                type="text"
                value={folderPath}
                onChange={(e) => setFolderPath(e.target.value)}
                placeholder="Digite o caminho da pasta"
            />
            <button onClick={handleListFiles}>Listar Arquivos</button>

            {error && <div style={{ color: 'red' }}>Erro: {error}</div>}

            <ul>
                {files.map((file) => (
                    <li key={file}>{file}</li>
                ))}
            </ul>
        </div>
    );
};
