// 'use client'

// import React, { useState, useEffect } from "react";
// import { getExcelData } from "../lib/data";
// import DataTable from "../ui/datatable";
// import Link from "next/link";
// import Button from "../ui/button";
// import { PDFGenerator } from "../ui/PDFGeneratorButton";
// import { EmailSender } from "../ui/EmailSenderButton";
// import SideMenu from "../components/SideMenu";

// export default function InfoManagerGastos() {
//   const [excelData, setExcelData] = useState([]);
//   const [isQuarterStart, setIsQuarterStart] = useState(false);
//   const [gastos, setGastos] = useState({});

//   useEffect(() => {
//     async function fetchData() {
//       const data = await getExcelData('info-manager-Gastos');
//       setExcelData(data);
      
//       // Initialize gastos state
//       const initialGastos = data.reduce((acc, row) => {
//         acc[row.id] = { luz: '', basura: '' };
//         return acc;
//       }, {});
//       setGastos(initialGastos);
//     }
//     fetchData();

//     // Check if current month is start of quarter
//     const currentMonth = new Date().getMonth();
//     setIsQuarterStart([0, 3, 6, 9].includes(currentMonth));
//   }, []);

//   const handleGastosChange = (id, type, value) => {
//     setGastos(prev => ({
//       ...prev,
//       [id]: { ...prev[id], [type]: value }
//     }));
//   };

//   return (
//     <div className="flex min-h-screen bg-cream text-brown">
//       <main className="flex-grow p-8">
//         <h1 className="text-6xl font-bold mb-16">Facturas Automáticas</h1>
//         <p className="text-2xl mb-4 font-bold">Facturas Compartidas Con Gastos</p>
//         <p className="text-m mb-6">Compruebe que su información es correcta. Si no fuera correcta, por favor corríjala en su fichero Excel.</p>
//         <DataTable data={excelData} />
//         <div className="mt-8 flex justify-center space-x-4">
//           <Link href="/">
//             <Button className="w-88 bg-forest text-offwhite border border-forest hover:bg-brown hover:text-offwhite">
//               Volver al Menú
//             </Button>
//           </Link>
//           <PDFGenerator />
//           <EmailSender />
//         </div>
//       </main>
//       <SideMenu 
//         isQuarterStart={isQuarterStart} 
//         gastos={gastos} 
//         onGastosChange={handleGastosChange}
//         data={excelData}
//       />
//     </div>
//   );
// }

import React from "react";
import { getExcelDataGastos } from "../lib/dataGastos";
import DataTable from "../ui/datatable";  // Changed from DataTable to datatable
import Link from "next/link";
import Button from "../ui/button";
import { PDFGenerator } from "../ui/PDFGeneratorButton";
import { EmailSender } from "../ui/EmailSenderButton";

export default async function InfoManager() {
  const excelData = await getExcelDataGastos();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-brown">
      <main className="text-center w-full max-w-6xl">
        <h1 className="text-6xl font-bold mb-16">Facturas Automáticas</h1>
        <p className="text-2xl mb-4 font-bold">Facturas Beatriz</p>
        <p className="text-m mb-6">Compruebe que su información es correcta. Si no fuera correcta, por favor corríjala en su fichero Excel.</p>
        <DataTable data={excelData} />
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/">
            <Button className="w-88 bg-forest text-offwhite border border-forest hover:bg-brown hover:text-offwhite">
              Volver al Menú
            </Button>
          </Link>
          <PDFGenerator />
          <EmailSender />
        </div>
      </main>
    </div>
  );
}