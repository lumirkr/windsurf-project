'use client';

import React, { useState } from 'react';

export default function FirefighterCalculator() {
  const [diameter, setDiameter] = useState('');
  const [flow, setFlow] = useState('');
  const [length, setLength] = useState('');
  const [frictionLoss, setFrictionLoss] = useState<number | null>(null);

  const calculateFrictionLoss = () => {
    // Fórmula simplificada de pérdida por fricción
    // FL = C * (Q^2) * L
    // Donde:
    // C = Coeficiente de la manguera (ejemplo: 15.5 para manguera de 1.5")
    // Q = Caudal en cientos de GPM (galones por minuto / 100)
    // L = Longitud de la manguera en cientos de pies
    
    const diameterInInches = parseFloat(diameter);
    const flowGPM = parseFloat(flow);
    const lengthInFeet = parseFloat(length);

    if (isNaN(diameterInInches) || isNaN(flowGPM) || isNaN(lengthInFeet)) {
      setFrictionLoss(null);
      return;
    }

    // Coeficiente C basado en el diámetro de la manguera
    let C = 2; // Valor por defecto
    if (diameterInInches === 1.5) C = 15.5;
    else if (diameterInInches === 1.75) C = 6.2;
    else if (diameterInInches === 2.5) C = 1.8;
    else if (diameterInInches === 3) C = 0.8;
    else if (diameterInInches === 4) C = 0.2;

    const Q = flowGPM / 100; // Caudal en cientos de GPM
    const L = lengthInFeet / 100; // Longitud en cientos de pies
    
    const calculatedFL = Math.round(C * Math.pow(Q, 2) * L * 10) / 10; // Redondear a 1 decimal
    
    setFrictionLoss(calculatedFL);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="diameter" className="block text-sm font-medium text-gray-700">
            Diámetro de la manguera (pulgadas)
          </label>
          <select
            id="diameter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
          >
            <option value="">Seleccione un diámetro</option>
            <option value="1.5">1.5"</option>
            <option value="1.75">1.75"</option>
            <option value="2.5">2.5"</option>
            <option value="3">3"</option>
            <option value="4">4"</option>
          </select>
        </div>

        <div>
          <label htmlFor="flow" className="block text-sm font-medium text-gray-700">
            Caudal (GPM - Galones por minuto)
          </label>
          <input
            type="number"
            id="flow"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ej: 100"
            value={flow}
            onChange={(e) => setFlow(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">
            Longitud de la manguera (pies)
          </label>
          <input
            type="number"
            id="length"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ej: 200"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={calculateFrictionLoss}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calcular Pérdida por Fricción
        </button>
      </div>

      {frictionLoss !== null && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Resultado:</h3>
          <p className="mt-1 text-2xl font-bold text-blue-700">
            {frictionLoss} PSI de pérdida por fricción
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Este es un cálculo aproximado. Para cálculos precisos, consulte las tablas del fabricante.
          </p>
        </div>
      )}
    </div>
  );
}
