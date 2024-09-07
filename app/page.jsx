import Image from "next/image";
import Link from "next/link";
import Button from './ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-brown">
      <main className="text-center flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8">Facturas Automáticas</h1>
        <p className="text-xl mb-12">Bienvenida a la aplicación para enviar facturas de forma automática</p>
        <Link href="/info-manager">
          <Button className="mt-8">
            Accede
          </Button>
        </Link>
      </main>
    </div>
  );
}
