"use client";

import React from 'react';
import { useUser } from "@clerk/nextjs";

type Recurso = {
  id: number;
  titulo: string;
  icono: string;
  link: string;
  descripcion?: string;
};

export default function Home() {
  // Lista completa de recursos disponibles
  const recursos = [
    { id: 1, titulo: 'Smart Driver', icono: '🚛', link: 'https://admin.smtdriver.com/' },
    { id: 2, titulo: 'Mantenimiento', icono: '🔧', link: 'https://google.com' },
    { id: 3, titulo: 'Cámaras', icono: '📹', link: '/camaras' },
    { id: 4, titulo: 'Biométricos', icono: '🖐️', link: 'http://10.20.0.33:8098/bioLogin.do' },
    { id: 5, titulo: 'Tickets', icono: '🔍', link: '/tickets' },
    { id: 6, titulo: 'Proyectos', icono: '📦', link: '/proyectos' },
    { id: 7, titulo: 'Reportes', icono: '📋', link: '/reportes' },
    { 
      id: 8, 
      titulo: 'Inventarios Places', 
      icono: '📊', 
      link: 'https://google.com',
      descripcion: 'Gestión de stock e inventarios'
    },
    { 
      id: 9, 
      titulo: 'Master Calendar', 
      icono: '📅', 
      link: '/calendar/conference',
      descripcion: 'Gestión de eventos'
    },
  ];

  const { user } = useUser();

  return (
    <div className="container mx-auto p-8 font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {user ? `Hola, ${user.firstName || 'usuario'}` : 'Bienvenido'}
        </h1>
        <p className="text-gray-500">Selecciona un recurso:</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recursos.map((item) => (
          <a 
            key={item.id} 
            href={item.link} 
            target={item.link.startsWith('http') ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-48 no-underline group"
          >
            <span className="text-5xl group-hover:scale-110 transition-transform">{item.icono}</span>
            <div className="text-center">
              <span className="font-semibold text-lg text-gray-700 block">{item.titulo}</span>
              {item.descripcion && (
                <span className="text-sm text-gray-500 mt-1 block">{item.descripcion}</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}