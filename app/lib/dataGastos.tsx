import * as XLSX from 'xlsx';

const EXCEL_FILE_URL = 'https://storage.googleapis.com/facturas_beaa/locales-Gastos.xlsx';

export async function getExcelDataGastos() {
  try {
    console.log(`Fetching Excel file from: ${EXCEL_FILE_URL}`);
    const response = await fetch(EXCEL_FILE_URL, {
      headers: {
        'Origin': 'https://invoices-lovat.vercel.app'
      }
    });
    
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
