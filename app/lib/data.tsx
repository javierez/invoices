import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function getExcelData(page: string) {
  let fileName;
  switch (page) {
    case 'info-manager-Beatriz':
      fileName = 'locales-Beatriz.xlsx';
      break;
    case 'info-manager-Compartidas':
      fileName = 'locales-Comp.xlsx';
      break;
    default:
      throw new Error('Invalid page specified');
  }

  const filePath = path.join(process.cwd(), 'public', 'data', fileName);
  const fileBuffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}
