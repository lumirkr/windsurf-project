import React from 'react';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Portal de Recursos',
  description: 'Portal interno Ubiquity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans">
          <Nav />
          <main>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}