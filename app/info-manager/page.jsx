import React from "react";
import { getExcelData } from "../lib/data";

export default async function InfoManager() {
  const excelData = await getExcelData();
  console.log('Excel data in InfoManager:', JSON.stringify(excelData, null, 2));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <main className="text-center w-full max-w-6xl">
        <h1 className="text-6xl font-bold mb-4">Information Manager</h1>
        <p className="text-xl mb-8">Manage your information with ease</p>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200 text-gray-700">
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
            <tbody className="text-gray-600">
              {excelData.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
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
      </main>
    </div>
  );
}