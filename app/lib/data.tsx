import * as XLSX from 'xlsx';

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

  const response = await fetch(`/data/${fileName}`);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}
