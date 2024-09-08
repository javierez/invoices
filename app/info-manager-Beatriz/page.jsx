import React from "react";
import { getExcelData } from "../lib/data";
import DataTable from "../ui/datatable";  // Changed from DataTable to datatable
import Link from "next/link";
import Button from "../ui/button";
import { PDFGenerator } from "../ui/PDFGeneratorButton";
import { EmailSender } from "../ui/EmailSenderButton";

export default async function InfoManager() {
  const excelData = await getExcelData('info-manager-Beatriz');

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