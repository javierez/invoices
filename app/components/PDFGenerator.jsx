import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

export async function generatePDFs(data, activePage) {
    console.log('Generating PDFs with data:', data);
    console.log('PDFGenerator - activePage:', activePage);
    const currentMonth = new Date().getMonth() + 1; // Get month number (1-12)
    const pdfPromises = data.map(async (row) => {
      console.log('Generating PDF for:', row.name_arrendatario, 'with activePage:', activePage);
      const pdfBuffer = await renderToBuffer(<InvoiceTemplate data={row} activePage={activePage} />);
      return {
        fileName: `FACTURA_${row.name_arrendatario}_${currentMonth.toString().padStart(2, '0')}.pdf`,
        buffer: pdfBuffer
      };
    });
  
    return Promise.all(pdfPromises);
  }