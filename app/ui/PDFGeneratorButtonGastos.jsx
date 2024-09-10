'use client'

import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import InvoiceTemplateGastos from '../components/InvoiceTemplate-Gastos';
import Button from './button';
import { usePathname } from 'next/navigation';

export function PDFGeneratorButtonGastos({ acceptedExpenses }) {
  const pathname = usePathname();
  const page = pathname.split('/').pop();

  const handleGeneratePDFs = async () => {
    try {
      console.log('Sending request with acceptedExpenses:', acceptedExpenses);
      const response = await fetch('/api/generate-pdfs-gastos', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acceptedExpenses }),
      });
      
      console.log('Response received:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.pdfs) {
        localStorage.setItem('generatedPDFs', JSON.stringify(data.pdfs));
        console.log('PDFs stored in localStorage');
        
        data.pdfs.forEach(pdf => {
          const blob = new Blob([Uint8Array.from(atob(pdf.data), c => c.charCodeAt(0))], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = pdf.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
        alert('PDFs generated and downloaded successfully');
      } else {
        throw new Error(data.error || 'Failed to generate PDFs');
      }
    } catch (error) {
      console.error('Error generating PDFs:', error);
      alert(`Failed to generate PDFs. Error: ${error.message}`);
    }
  };

  return (
    <Button 
      className="w-88 bg-forest text-offwhite border border-forest hover:bg-brown hover:text-offwhite"
      onClick={handleGeneratePDFs}
      disabled={Object.keys(acceptedExpenses).length === 0}
    >
      Generar Facturas con Gastos
    </Button>
  );
}

