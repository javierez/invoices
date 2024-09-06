import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <main className="text-center">
        <h1 className="text-6xl font-bold mb-4">Hello World</h1>
        <p className="text-xl mb-8">Welcome to my beautiful Next.js app!</p>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
          className="mb-8"
        />
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
        >
          Learn Next.js
        </a>
        <Link href="/info-manager">
        <button>"Go to info Manager"</button>
        </Link>
        
      </main>
    </div>
  );
}
