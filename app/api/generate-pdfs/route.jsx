import { getExcelData } from '../../lib/data';
import { generatePDFs } from '../../components/PDFGenerator';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('API route hit: POST /api/generate-pdfs');
  try {
    const { page } = await request.json();
    
    const referer = request.headers.get('referer');
    console.log('Referer:', referer);

    const activePage = referer.includes('info-manager-Beatriz') ? 'info-manager-Beatriz' : 
                       referer.includes('info-manager-Compartidas') ? 'info-manager-Compartidas' : 'unknown';
    console.log('Route activated from:', activePage);

    if (!page) {
      throw new Error('Page information is missing');
    }

    console.log('Fetching Excel data for page:', page);
    const excelData = await getExcelData(page);
    console.log('Excel data fetched successfully:', excelData.length, 'rows');

    console.log('Generating PDFs with activePage:', activePage);
    const pdfs = await generatePDFs(excelData, activePage);
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
