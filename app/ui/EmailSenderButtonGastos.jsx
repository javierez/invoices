'use client'

import React from 'react';
import Button from './button';

export function EmailSenderGastos() {
  const handleSendEmails = async () => {
    try {
      const storedPDFs = JSON.parse(localStorage.getItem('generatedPDFs'));
      if (!storedPDFs) {
        throw new Error('No PDFs found in local storage');
      }

      const response = await fetch('/api/send-pdfs-gastos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfs: storedPDFs }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      alert('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
      alert(`Failed to send emails. Error: ${error.message}`);
    }
  };

  return (
    <Button onClick={handleSendEmails} className="w-88 bg-forest text-offwhite border border-forest hover:bg-brown hover:text-offwhite">
      Enviar Emails (Gastos)
    </Button>
  );
}
