import { getExcelDataGastos } from '../../lib/dataGastos';
import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceTemplateGastos from '../../components/InvoiceTemplate-Gastos';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('API route hit: POST /api/generate-pdfs-gastos');
  try {
    const { acceptedExpenses } = await request.json();
    console.log('Accepted expenses:', acceptedExpenses);

    console.log('Fetching Excel data...');
    const excelData = await getExcelDataGastos();
    console.log('Excel data fetched successfully:', excelData.length, 'rows');

    console.log('Generating PDFs with expenses...');
    const pdfs = await generatePDFsWithExpenses(excelData, acceptedExpenses);
    console.log('PDFs generated successfully:', pdfs.length, 'PDFs');

    return NextResponse.json({
      pdfs: pdfs.map(pdf => ({
        fileName: pdf.fileName,
        data: pdf.buffer.toString('base64')
      }))
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

async function generatePDFsWithExpenses(data, acceptedExpenses) {
  console.log('Generating PDFs with data and expenses:', data.length, 'rows', Object.keys(acceptedExpenses).length, 'expenses');
  console.log('Accepted expenses:', JSON.stringify(acceptedExpenses, null, 2));

  const currentMonth = new Date().getMonth() + 1; // Get month number (1-12)
  
  const validatedData = [];
  const skippedRows = [];
  
  // Validate required fields for each row
  data.forEach((row, index) => {
    const missingFields = [];
    if (!row.mail || row.mail.trim() === '') {
      missingFields.push('email');
    }
    if (!row.name_arrendatario || row.name_arrendatario.trim() === '') {
      missingFields.push('name');
    }
    if (!row.nif || row.nif.trim() === '') {
      missingFields.push('nif');
    }
    
    if (missingFields.length > 0) {
      console.warn(`Skipping row ${index}: Missing ${missingFields.join(', ')} for property ${row.property || 'unknown'}`);
      skippedRows.push({
        index: index,
        property: row.property || 'unknown',
        reason: `Missing fields: ${missingFields.join(', ')}`
      });
    } else {
      validatedData.push(row);
    }
  });
  
  console.log(`Processing ${validatedData.length} valid rows, skipped ${skippedRows.length} invalid rows`);
  
  const pdfPromises = validatedData.map(async (row) => {
    const expenses = acceptedExpenses[row.nif] || { light: 0, trash: 0 };
    console.log(`Expenses for ${row.nif}:`, JSON.stringify(expenses, null, 2));

    const additionalExpenses = {
      light: Number(expenses.light) || 0,
      trash: Number(expenses.trash) || 0
    };
    console.log(`Converted expenses for ${row.nif}:`, JSON.stringify(additionalExpenses, null, 2));

    const pdfBuffer = await renderToBuffer(
      <InvoiceTemplateGastos 
        data={row} 
        additionalExpenses={additionalExpenses} 
      />
    );
    return {
      fileName: `FACTURA_${row.name_arrendatario}_${currentMonth.toString().padStart(2, '0')}.pdf`,
      buffer: pdfBuffer
    };
  });

  return Promise.all(pdfPromises);
}
