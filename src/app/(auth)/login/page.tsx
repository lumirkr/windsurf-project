import React from 'react';
import Image from 'next/image'; 

export default function LoginPage() {
  return (
    // AQUÍ ESTÁ EL CAMBIO: bg-[#FF6B35] (Naranja Nectarina)
    // Solo afecta a esta página.
    <div className="min-h-screen flex items-center justify-center bg-[#FF6B35]">
      
      {/* La tarjeta blanca se mantiene igual */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4">
            <Image 
              src="/images/ubiquity-logo.png" 
              alt="Ubiquity Logo"
              width={180} 
              height={60} 
              priority 
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Bienvenido de nuevo</h2>
          <p className="text-gray-500 text-sm">Portal de Recursos Ubiquity</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="usuario@ejemplo.com" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900" 
            />
          </div>

          <a 
            href="/" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors mt-6 shadow-sm"
          >
            Iniciar Sesión
          </a>
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-6">
          Si tienes problemas de acceso, contacta a IT.
        </p>
      </div>
    </div>
  );
}