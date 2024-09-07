import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="bg-offwhite rounded-lg shadow-lg overflow-x-auto w-full max-w-[1600px] mx-auto">
      <table className="w-full text-left table-auto">
        <thead className="bg-sage text-offwhite">
          <tr>
            {/* Increased min-width for all columns */}
            <th className="py-4 px-6 min-w-[300px]">Name</th>
            <th className="py-4 px-6 min-w-[250px]">Arrendatario</th>
            <th className="py-4 px-6 min-w-[150px]">NIF</th>
            <th className="py-4 px-6 min-w-[150px]">Euros</th>
            <th className="py-4 px-6 min-w-[150px]">IRPF</th>
            <th className="py-4 px-6 min-w-[150px]">IVA</th>
            <th className="py-4 px-6 min-w-[150px]">Total</th>
            <th className="py-4 px-6 min-w-[250px]">Email</th>
          </tr>
        </thead>
        <tbody className="text-brown">
          {data.map((row, index) => (
            <tr key={index} className="border-b border-sage hover:bg-sage/20 transition-colors duration-300">
              {/* Increased padding to match header cells */}
              <td className="py-4 px-6">{row.short_name}</td>
              <td className="py-4 px-6">{row.name_arrendatario}</td>
              <td className="py-4 px-6">{row.nif}</td>
              <td className="py-4 px-6">{row.euros}</td>
              <td className="py-4 px-6">{row.irpf}</td>
              <td className="py-4 px-6">{row.iva}</td>
              <td className="py-4 px-6">{row.total}</td>
              <td className="py-4 px-6">{row.mail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
