import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

export async function generatePDFs(data, activePage) {
    console.log('Generating PDFs with data:', data);
    console.log('PDFGenerator - activePage:', activePage);
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
      if (!row.dni || row.dni.trim() === '') {
        missingFields.push('dni');
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
      console.log('Generating PDF for:', row.name_arrendatario, 'with activePage:', activePage);
      const pdfBuffer = await renderToBuffer(<InvoiceTemplate data={row} activePage={activePage} />);
      return {
        fileName: `FACTURA_${row.name_arrendatario}_${currentMonth.toString().padStart(2, '0')}.pdf`,
        buffer: pdfBuffer
      };
    });
  
    return Promise.all(pdfPromises);
  }