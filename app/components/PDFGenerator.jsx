import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

export async function generatePDFs(data) {
    console.log('Generating PDFs with data:', data);
    const pdfPromises = data.map(async (row, index) => {
      const pdfBuffer = await renderToBuffer(<InvoiceTemplate data={row} />);
      return {
        fileName: `invoice_${index + 1}.pdf`,
        buffer: pdfBuffer
      };
    });
  
    return Promise.all(pdfPromises);
  }