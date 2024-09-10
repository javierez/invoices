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
  const currentMonth = new Date().getMonth() + 1; // Get month number (1-12)
  const pdfPromises = data.map(async (row) => {
    const expenses = acceptedExpenses[row.nif] || { light: 0, trash: 0 };
    const pdfBuffer = await renderToBuffer(
      <InvoiceTemplateGastos data={row} additionalExpenses={expenses} />
    );
    return {
      fileName: `FACTURA_${row.name_arrendatario}_${currentMonth.toString().padStart(2, '0')}.pdf`,
      buffer: pdfBuffer
    };
  });

  return Promise.all(pdfPromises);
}
