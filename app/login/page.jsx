'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/button';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_APP_PW) {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige">
      <form onSubmit={handleSubmit} className="bg-offwhite p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-brown">Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-brown"
          placeholder="Enter password"
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
