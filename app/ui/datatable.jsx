import React from 'react';

const DataTable = ({ data }) => {
  console.log('DataTable received data:', data);

  return (
    <div className="bg-offwhite rounded-lg shadow-lg overflow-x-auto w-full max-w-[1600px] mx-auto">
      <table className="w-full text-left table-auto">
        <thead className="bg-sage text-offwhite">
          <tr>
            <th className="py-4 px-6 min-w-[300px]">Name</th>
            <th className="py-4 px-6 min-w-[250px]">Arrendatario</th>
            <th className="py-4 px-6 min-w-[150px]">NIF</th>
            <th className="py-4 px-6 min-w-[150px]">Euros</th>
            <th className="py-4 px-6 min-w-[150px]">IRPF</th>
            <th className="py-4 px-6 min-w-[150px]">IVA</th>
            <th className="py-4 px-6 min-w-[150px]">Total</th>
            <th className="py-4 px-6 min-w-[250px]">Email</th>
            <th className="py-4 px-6 min-w-[280px]">Referencia Catastral</th>
          </tr>
        </thead>
        <tbody className="text-brown">
          {data.map((row, index) => (
            <tr key={index} className="border-b border-sage hover:bg-sage/20 transition-colors duration-300">
              <td className="py-4 px-6">{row.short_name}</td>
              <td className="py-4 px-6">{row.name_arrendatario}</td>
              <td className="py-4 px-6">{row.nif}</td>
              <td className="py-4 px-6">{row.euros.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td className="py-4 px-6">{(row.irpf || 0).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td className="py-4 px-6">{row.iva.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td className="py-4 px-6">{row.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</td>
              <td className="py-4 px-6">{row.mail}</td>
              <td className="py-4 px-6">{row.ref_catastral}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
