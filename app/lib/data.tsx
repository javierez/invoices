import * as XLSX from 'xlsx';

const EXCEL_FILES = {
  'info-manager-Beatriz': 'https://storage.googleapis.com/facturas_bea/locales-Beatriz.xlsx',
  'info-manager-Compartidas': 'https://storage.googleapis.com/facturas_bea/locales-Comp.xlsx',
};

export async function getExcelData(page: string) {
  const fileUrl = EXCEL_FILES[page];
  if (!fileUrl) {
    throw new Error(`Invalid page specified or missing environment variable for ${page}`);
  }

  try {
    console.log(`Fetching Excel file from: ${fileUrl}`);
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('Received empty array buffer');
    }
    
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    console.log(`Successfully parsed Excel file. Found ${data.length} rows.`);
    return data;
  } catch (error) {
    console.error('Error fetching or parsing Excel file:', error);
    throw error;
  }
}
