"use client";

import React from 'react';
import { FaVideo, FaVideoSlash, FaVideoCamera } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';

type CameraCard = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
};

export default function CamerasPage() {
  const cameraCards: CameraCard[] = [
    {
      id: 1,
      title: 'VAST',
      description: 'Sistema de Monitoreo Vivotek',
      icon: <MdSecurity className="text-4xl text-blue-600" />,
      link: 'vast://',
    },
    // Add more camera cards here if needed
  ];

  const handleVastClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    window.location.href = link;
  };

  return (
    <div className="container mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Cámaras de Seguridad</h1>
      <p className="text-gray-500 mb-8">Sistemas de monitoreo disponibles:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameraCards.map((card) => (
          <div 
            key={card.id}
            onClick={(e) => handleVastClick(e, card.link)}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-48 no-underline group"
          >
            <div className="p-3 bg-blue-50 rounded-full">
              {card.icon}
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg text-gray-700">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            </div>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Acceder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
