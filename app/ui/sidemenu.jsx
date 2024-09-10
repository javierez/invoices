import React from 'react';
import Button from './button';

const SideMenu = ({ data, additionalExpenses, onExpenseChange, onAccept }) => {
  return (
    <div className="w-64 bg-sage p-4 text-offwhite ml-4 rounded-lg">
      <h2 className="text-xl font-extrabold mb-8 text-brown uppercase tracking-wide relative text-center">
        Gastos Adicionales
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-brown"></span>
      </h2>
      {data.map((row) => (
        <div key={row.nif} className="mb-6">
          <h3 className="font-semibold text-sm mb-2">{row.name_arrendatario}</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="number"
              placeholder="Luz"
              value={additionalExpenses[row.nif]?.light || ''}
              onChange={(e) => onExpenseChange(row.nif, 'light', e.target.value)}
              className="p-2 text-brown rounded"
            />
            <input
              type="number"
              placeholder="Basura"
              value={additionalExpenses[row.nif]?.trash || ''}
              onChange={(e) => onExpenseChange(row.nif, 'trash', e.target.value)}
              className="p-2 text-brown rounded"
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Button onClick={onAccept} className="w-3/4 mt-4 bg-forest bg-opacity-80 text-offwhite text-sm">
          Aceptar
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
