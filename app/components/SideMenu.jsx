import React from 'react';

const SideMenu = ({ data, additionalExpenses, onExpenseChange}) => {
  return (
    <div className="w-64 bg-sage p-4 text-offwhite ml-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-brown">Gastos Adicionales</h2>
      {data.map((row) => (
        <div key={row.nif} className="mb-6">
          <h3 className="font-semibold text-sm mb-2">{row.name_arrendatario}</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="number"
              placeholder="Luz"
              value={additionalExpenses[row.name_arrendatario]?.light || ''}
              onChange={(e) => onExpenseChange(row.name_arrendatario, 'light', e.target.value)}
              className="p-2 text-brown rounded"
            />
            <input
              type="number"
              placeholder="Basura"
              value={additionalExpenses[row.name_arrendatario]?.trash || ''}
              onChange={(e) => onExpenseChange(row.name_arrendatario, 'trash', e.target.value)}
              className="p-2 text-brown rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
