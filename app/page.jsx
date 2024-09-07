import Image from "next/image";
import Link from "next/link";
import Button from './ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-brown">
      <main className="text-center flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8">Facturas Automáticas</h1>
        <p className="text-xl mb-12">Bienvenida a la aplicación para enviar facturas de forma automática</p>
        <div className="flex flex-col space-y-4 items-center">
          <Link href="/info-manager-Beatriz">
            <Button className="w-96">
              Facturas Beatriz
            </Button>
          </Link>
          <Link href="#">
            <Button className="w-96" disabled>
              Facturas Compartidas Gastos
            </Button>
          </Link>
          <Link href="#">
            <Button className="w-96" disabled>
              Facturas Compartidas Sin Gastos
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
