"use client";

import React from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  // Show nothing while loading
  if (!isLoaded) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">Portal de Recursos</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/" className="text-black border-b-2 border-black pb-0.5">Home</Link>
          <Link href="/proyectos" className="text-gray-500 hover:text-black transition-colors">Projects</Link>
          <Link href="/tickets" className="text-gray-500 hover:text-black transition-colors">Tickets</Link>
          <Link href="vast://" className="text-gray-500 hover:text-black transition-colors">VAST</Link>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-gray-700 text-sm hidden md:block">
            {user ? (
              `Hola, ${user.firstName || (user.primaryEmailAddress?.emailAddress === 'lmreyes@zerovariance.com' ? 'Luis' : user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Usuario')}`
            ) : (
              <Link href="/sign-in" className="text-gray-700 hover:text-black">
                Iniciar sesión
              </Link>
            )}
          </span>
          
          {user && (
            <SignOutButton afterSignOutUrl="/sign-in">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                Cerrar sesión
              </button>
            </SignOutButton>
          )}
        </div>
      </div>
    </nav>
  );
}