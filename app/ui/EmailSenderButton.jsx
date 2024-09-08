'use client'

import React from 'react';
import Button from './button';
import { usePathname } from 'next/navigation';

export function EmailSender() {
  const pathname = usePathname();
  const page = pathname.split('/').pop();

  const handleSendEmails = async () => {
    try {
      const storedPDFs = localStorage.getItem('generatedPDFs');
      console.log('Stored PDFs:', storedPDFs);
      if (!storedPDFs) {
        throw new Error('No PDFs generated. Please generate PDFs first.');
      }

      const pdfs = JSON.parse(storedPDFs);

      console.log('Sending request to email PDFs');
      const response = await fetch('/api/send-pdfs', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfs, page }),
      });
      
      console.log('Response received:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error sending emails:', error);
      alert(`Failed to send emails. Error: ${error.message}`);
    }
  };

  return (
    <Button 
      className="w-88 bg-forest text-offwhite border border-forest hover:bg-brown hover:text-offwhite"
      onClick={handleSendEmails}
    >
      Enviar Facturas por Email
    </Button>
  );
}
