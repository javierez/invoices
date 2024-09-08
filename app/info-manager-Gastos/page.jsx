'use client'

import React, { useState, useEffect } from "react";
import { getExcelDataGastos } from "../lib/dataGastos";
import DataTable from "../ui/datatable";
import Link from "next/link";
import Button from "../ui/button";
import { PDFGenerator } from "../ui/PDFGeneratorButton";
import { EmailSender } from "../ui/EmailSenderButton";
import SideMenu from "../components/SideMenu";

export default function InfoManager() {
  const [excelData, setExcelData] = useState([]);
  const [additionalExpenses, setAdditionalExpenses] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getExcelDataGastos();
      setExcelData(data);
      // Initialize additionalExpenses state
      const initialExpenses = data.reduce((acc, row) => {
        acc[row.short_name] = { light: '', trash: '' };
        return acc;
      }, {});
      setAdditionalExpenses(initialExpenses);
    }
    fetchData();
  }, []);

  const handleExpenseChange = (shortName, type, value) => {
    setAdditionalExpenses(prev => ({
      ...prev,
      [shortName]: { ...prev[shortName], [type]: value }
    }));
  };

  return (
    <div className="flex min-h-screen bg-cream text-brown">
      <main className="flex-grow p-8">
        <h1 className="text-6xl font-bold mb-16">Facturas Automáticas</h1>
        <p className="text-2xl mb-4 font-bold">Facturas con Gastos</p>
        <p className="text-m mb-6">Compruebe que su información es correcta. Si no fuera correcta, por favor corríjala en su fichero Excel.</p>
        <div className="flex">
          <DataTable data={excelData} />
          <SideMenu 
            data={excelData} 
            additionalExpenses={additionalExpenses} 
            onExpenseChange={handleExpenseChange} 
          />
        </div>
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