"use client";

import React from 'react';
import { useUser } from "@clerk/nextjs";
import ModuleGuard from '@/components/ModuleGuard';

type Recurso = {
  id: number;
  titulo: string;
  icono: string;
  link: string;
  descripcion?: string;
  moduleName?: string; // Nombre del módulo para control de permisos
};

export default function Home() {
  // Lista completa de recursos disponibles con sus módulos asociados
  const recursos: Recurso[] = [
    { id: 1, titulo: 'Smart Driver', icono: '🚛', link: 'https://admin.smtdriver.com/' },
    { id: 2, titulo: 'Mantenimiento', icono: '🔧', link: 'https://google.com' },
    { 
      id: 3, 
      titulo: 'Cámaras', 
      icono: '📹', 
      link: '/camaras',
      moduleName: 'cameras' 
    },
    { id: 4, titulo: 'Biométricos', icono: '🖐️', link: 'http://10.20.0.33:8098/bioLogin.do' },
    { id: 5, titulo: 'Tickets', icono: '🔍', link: '/tickets' },
    { 
      id: 6, 
      titulo: 'Proyectos', 
      icono: '📦', 
      link: '/proyectos',
      moduleName: 'projects'
    },
    { id: 7, titulo: 'Reportes', icono: '📋', link: '/reportes' },
    { 
      id: 8, 
      titulo: 'Inventarios Places', 
      icono: '📊', 
      link: 'https://google.com',
      descripcion: 'Gestión de stock e inventarios',
      moduleName: 'inventory'
    },
    { 
      id: 9, 
      titulo: 'Master Calendar', 
      icono: '📅', 
      link: '/calendar/conference',
      descripcion: 'Gestión de eventos'
    },
    { 
      id: 10, 
      titulo: 'Calculadora de Bomberos', 
      icono: '🧯', 
      link: '/calculadora-bomberos',
      descripcion: 'Cálculos para bomberos',
      moduleName: 'calculator'
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
        {recursos.map((item) => {
          // Si el recurso no tiene moduleName o es la calculadora, se muestra a todos
          if (!item.moduleName || item.moduleName === 'calculator') {
            return (
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
            );
          }
          
          // Para recursos con control de acceso, usamos ModuleGuard
          return (
            <ModuleGuard key={item.id} moduleName={item.moduleName}>
              <a 
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
            </ModuleGuard>
          );
        })}
      </div>
    </div>
  );
}