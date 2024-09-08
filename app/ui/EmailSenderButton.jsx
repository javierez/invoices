'use client'

import React, { useState } from 'react';
import Button from './button';
import ConfirmationDialog from '../components/ConfirmationDialog';

export function EmailSender() {
  const [showConfirmation, setShowConfirmation] = useState(false);

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
        body: JSON.stringify({ pdfs }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error sending emails:', error);
      alert(`Failed to send emails. Error: ${error.message}`);
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    handleSendEmails();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button 
        className="w-88 bg-forest text-offwhite border border-forest hover:bg-brown hover:text-offwhite"
        onClick={() => setShowConfirmation(true)}
      >
        Enviar Facturas por Email
      </Button>
      {showConfirmation && (
        <ConfirmationDialog
          message="¿Está seguro de que desea enviar las facturas por email?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
