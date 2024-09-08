import React from 'react';
import Button from '../ui/button';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <p className="mb-4 text-brown">{message}</p>
        <div className="flex justify-end space-x-2">
          <Button onClick={onCancel} className="bg-gray-300 text-brown">Cancelar</Button>
          <Button onClick={onConfirm} className="bg-forest text-offwhite">Confirmar</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
