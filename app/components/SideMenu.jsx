import React from 'react';

const SideMenu = ({ isQuarterStart, gastos, onGastosChange, data }) => {
  return (
    <div className="w-64 bg-sage p-4 text-offwhite">
      <h2 className="text-xl font-bold mb-4">Gastos Adicionales</h2>
      {isQuarterStart ? (
        <p className="mb-4">Es inicio de trimestre. Por favor, ingrese los gastos de Luz y Basura.</p>
      ) : (
        <p className="mb-4">No es inicio de trimestre. Los gastos de Luz y Basura no se aplicarán este mes.</p>
      )}
      {data.map((row) => (
        <div key={row.id} className="mb-4">
          <h3 className="font-bold">{row.short_name}</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="number"
              placeholder="Luz"
              value={gastos[row.id]?.luz || ''}
              onChange={(e) => onGastosChange(row.id, 'luz', e.target.value)}
              className="p-2 text-brown rounded"
            />
            <input
              type="number"
              placeholder="Basura"
              value={gastos[row.id]?.basura || ''}
              onChange={(e) => onGastosChange(row.id, 'basura', e.target.value)}
              className="p-2 text-brown rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
