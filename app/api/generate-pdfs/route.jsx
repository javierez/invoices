import { getExcelData } from '../../lib/data';
import { generatePDFs } from '../../components/PDFGenerator';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('API route hit: POST /api/generate-pdfs');
  try {
    console.log('Fetching Excel data...');
    const excelData = await getExcelData();
    console.log('Excel data fetched successfully:', excelData.length, 'rows');

    console.log('Generating PDFs...');
    const pdfs = await generatePDFs(excelData);
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
