import * as XLSX from 'xlsx';

export async function getExcelDataGastos() {
  const fileName = 'locales-Gastos.xlsx';
  const response = await fetch(`/data/${fileName}`);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}
