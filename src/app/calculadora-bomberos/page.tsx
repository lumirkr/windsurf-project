import React from 'react';
import FirefighterCalculator from '@/components/FirefighterCalculator';

export default function FirefighterCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Calculadora de Bomberos
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Herramienta para el cálculo de pérdida de presión en mangueras
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <FirefighterCalculator />
        </div>
        
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Nota importante:</strong> Esta calculadora proporciona estimaciones basadas en fórmulas estándar. 
                Para operaciones críticas, siempre consulte los manuales del fabricante y las regulaciones locales de seguridad contra incendios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
