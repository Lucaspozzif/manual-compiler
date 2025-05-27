import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface RowData {
  col1: any;
  col2: any;
  col3: any;
  col4: any;
}

export function Home() {
  const [data, setData] = useState<RowData[]>([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const processedData = (json as any[][]).map(row => ({
        col1: row[0] ?? '',
        col2: row[1] ?? '',
        col3: row[2] ?? '',
        col4: row[3] ?? ''
      }));

      setData(processedData);
    };
    reader.readAsBinaryString(file);
  }

  function exportData() {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ProcessedData");
    XLSX.writeFile(wb, "processed_data.xlsx");
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Leitor de Planilha</h1>

      <input 
        type="file" 
        accept=".xlsx,.csv" 
        onChange={handleFileChange}
        className="mb-4 border rounded p-2"
      />

      {data.length > 0 && (
        <>
          <table className="border-collapse w-full max-w-4xl mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Coluna 1</th>
                <th className="border px-4 py-2">Coluna 2</th>
                <th className="border px-4 py-2">Coluna 3</th>
                <th className="border px-4 py-2">Coluna 4</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{row.col1}</td>
                  <td className="border px-4 py-2">{row.col2}</td>
                  <td className="border px-4 py-2">{row.col3}</td>
                  <td className="border px-4 py-2">{row.col4}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button 
            onClick={exportData} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Exportar XLSX
          </button>
        </>
      )}
    </div>
  );
}
