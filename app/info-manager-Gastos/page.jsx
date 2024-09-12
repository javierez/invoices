'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getExcelDataGastos } from "../lib/dataGastos";
import DataTable from "../ui/datatable";
import Link from "next/link";
import Button from "../ui/button";
import { PDFGeneratorButtonGastos } from "../ui/PDFGeneratorButtonGastos";
import { EmailSenderGastos } from "../ui/EmailSenderButtonGastos";
import SideMenu from "../ui/sidemenu";

export default function InfoManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [additionalExpenses, setAdditionalExpenses] = useState({});
  const [acceptedExpenses, setAcceptedExpenses] = useState({});
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const data = await getExcelDataGastos();
      setExcelData(data);
      // Initialize additionalExpenses state
      const initialExpenses = data.reduce((acc, row) => {
        acc[row.nif] = { light: '', trash: '' };
        return acc;
      }, {});
      setAdditionalExpenses(initialExpenses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleExpenseChange = (nif, type, value) => {
    setAdditionalExpenses(prev => ({
      ...prev,
      [nif]: { ...prev[nif], [type]: value }
    }));
  };

  const handleAccept = () => {
    setAcceptedExpenses(additionalExpenses);
    console.log('Accepted expenses:', additionalExpenses);
    alert('Additional expenses accepted! Check console for details.');
  };

  return (
    <div className="flex min-h-screen bg-beige text-brown">
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
            onAccept={handleAccept}
          />
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/">
            <Button className="w-88 bg-forest text-offwhite border border-forest hover:bg-brown hover:text-offwhite">
              Volver al Menú
            </Button>
          </Link>
          <PDFGeneratorButtonGastos acceptedExpenses={acceptedExpenses} />
          <EmailSenderGastos />
        </div>
      </main>
    </div>
  );
}