'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { hasPermission } from '@/config/permissions';

interface ModuleGuardProps {
  moduleName: string;
  children: React.ReactNode;
}

export default function ModuleGuard({ moduleName, children }: ModuleGuardProps) {
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;
  
  // Verificar si el usuario tiene permiso para ver este módulo
  const canAccess = hasPermission(email, moduleName);
  
  // Si no tiene permiso, no renderizar nada
  if (!canAccess) {
    return null;
  }
  
  // Si tiene permiso, renderizar los children
  return <>{children}</>;
}
