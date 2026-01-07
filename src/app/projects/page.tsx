import React from 'react';

export default function ProjectsPage() {
  // Datos de ejemplo para que no se vea vacío
  const projects = [
    { id: 1, name: 'Mantenimiento AC - Torre 1', status: 'En Progreso', date: '2025-10-15', color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'Instalación Cámaras Perímetro Sur', status: 'Pendiente', date: '2025-11-01', color: 'bg-yellow-100 text-yellow-800' },
    { id: 3, name: 'Revisión de Generadores', status: 'Completado', date: '2025-09-20', color: 'bg-green-100 text-green-800' },
    { id: 4, name: 'Actualización Biométricos', status: 'En Progreso', date: '2025-10-30', color: 'bg-blue-100 text-blue-800' },
  ];

  return (
    <div className="container mx-auto p-8 font-sans">
      {/* Encabezado con botón de volver */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-gray-500">Gestión y seguimiento de obras</p>
        </div>
        <a href="/" className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          ← Volver al Inicio
        </a>
      </div>

      {/* Tabla de Proyectos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Nombre del Proyecto</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Fecha Límite</th>
              <th className="p-4 font-semibold text-gray-600 text-sm uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{proj.name}</td>
                <td className="p-4 text-gray-500">{proj.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${proj.color}`}>
                    {proj.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}