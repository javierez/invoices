'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getExcelData } from "../lib/data";
import DataTable from "../ui/datatable";
import Link from "next/link";
import Button from "../ui/button";
import { PDFGenerator } from "../ui/PDFGeneratorButton";
import { EmailSender } from "../ui/EmailSenderButton";

export default function InfoManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [excelData, setExcelData] = useState([]);
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
      const data = await getExcelData('info-manager-Beatriz');
      setExcelData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

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