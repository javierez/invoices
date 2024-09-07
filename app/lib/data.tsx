import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function getExcelData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'locales-Beatriz.xlsx');
  const fileBuffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}
