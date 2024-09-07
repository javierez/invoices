import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="bg-offwhite rounded-lg shadow-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-sage text-offwhite">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Arrendatario</th>
            <th className="py-3 px-4">NIF</th>
            <th className="py-3 px-4">Euros</th>
            <th className="py-3 px-4">IRPF</th>
            <th className="py-3 px-4">IVA</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Email</th>
          </tr>
        </thead>
        <tbody className="text-brown">
          {data.map((row, index) => (
            <tr key={index} className="border-b border-sage hover:bg-sage/20 transition-colors duration-300">
              <td className="py-3 px-4">{row.short_name}</td>
              <td className="py-3 px-4">{row.name_arrendatario}</td>
              <td className="py-3 px-4">{row.nif}</td>
              <td className="py-3 px-4">{row.euros}</td>
              <td className="py-3 px-4">{row.irpf}</td>
              <td className="py-3 px-4">{row.iva}</td>
              <td className="py-3 px-4">{row.total}</td>
              <td className="py-3 px-4">{row.mail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
