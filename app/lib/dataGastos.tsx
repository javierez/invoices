import * as XLSX from 'xlsx';
import path from 'path';

export async function getExcelDataGastos() {
  if (typeof window === 'undefined') {
    // Server-side
    const { readFile } = await import('fs/promises');
    const filePath = path.join(process.cwd(), 'public', 'data', 'locales-Gastos.xlsx');
    try {
      const fileBuffer = await readFile(filePath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(sheet);
    } catch (error) {
      console.error('Error reading Excel file:', error);
      throw new Error('Unable to read Excel file');
    }
  } else {
    // Client-side
    const response = await fetch('/data/locales-Gastos.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  }
}
