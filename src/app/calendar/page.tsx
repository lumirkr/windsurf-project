import React from 'react';

export default function CalendarMenu() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 font-sans">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Portal de Recursos 📅</h1>
        <p className="text-gray-600 text-lg">Selecciona el tipo de espacio que necesitas reservar:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* OPCIÓN 1: SALAS DE CONFERENCIA */}
        <a href="/calendar/conference" className="group bg-white p-10 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center no-underline relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
          <div className="bg-blue-100 p-6 rounded-full mb-6 group-hover:bg-blue-600 transition-colors">
            <span className="text-5xl group-hover:text-white transition-colors">💼</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Salas de Conferencia</h2>
          <div className="text-gray-500 mb-4">
            <p>Nivel 9 y Nivel 14</p>
          </div>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
            Reserva por Horas
          </span>
        </a>

        {/* OPCIÓN 2: SALAS DE ENTRENAMIENTO */}
        <a href="/calendar/training" className="group bg-white p-10 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center no-underline relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-orange-500"></div>
          <div className="bg-orange-100 p-6 rounded-full mb-6 group-hover:bg-orange-600 transition-colors">
            <span className="text-5xl group-hover:text-white transition-colors">🎓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Salas de Entrenamiento</h2>
          <div className="text-gray-500 mb-4">
            <p>Salas 1, 2, 3 (Nivel 9) y Coworker</p>
          </div>
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
            Reserva por Día Completo
          </span>
        </a>

      </div>

      <div className="mt-16 text-center text-gray-400 text-sm">
        <p>© 2025 Portal de Gestión de Espacios</p>
      </div>
    </div>
  );
}