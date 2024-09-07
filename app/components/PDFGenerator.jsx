import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';
import path from 'path';
import fs from 'fs';

export async function generatePDFs(data) {
  const pdfDir = path.join(process.cwd(), 'public', 'pdfs');
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir, { recursive: true });
  }

  const pdfPromises = data.map(async (row, index) => {
    const pdfBuffer = await renderToBuffer(<InvoiceTemplate data={row} />);
    const fileName = `invoice_${index + 1}.pdf`;
    const filePath = path.join(pdfDir, fileName);
    fs.writeFileSync(filePath, pdfBuffer);
    return fileName;
  });

  return Promise.all(pdfPromises);
}
