// Configuración de permisos por usuario
// Los módulos disponibles son: 'cameras', 'inventory', 'projects', 'calculator'

type UserPermissions = {
  email: string;
  modules: string[];
};

// Lista de permisos por usuario
const USER_PERMISSIONS: UserPermissions[] = [
  {
    email: 'lmreyes@zerovariance.com',
    modules: ['cameras', 'inventory', 'projects', 'calculator'] // Acceso completo
  },
  // Ejemplo para agregar otro usuario:
  // {
  //   email: 'otro@ejemplo.com',
  //   modules: ['calculator'] // Solo acceso a la calculadora
  // }
];

// Función para obtener los módulos permitidos para un usuario
export function getUserPermissions(email: string | null | undefined): string[] {
  if (!email) {
    // Usuario no autenticado, solo acceso a la calculadora
    return ['calculator'];
  }

  const user = USER_PERMISSIONS.find(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (user) {
    return user.modules;
  }
  
  // Usuario autenticado pero no en la lista, acceso por defecto
  return ['calculator'];
}

// Función para verificar si un usuario tiene acceso a un módulo específico
export function hasPermission(email: string | null | undefined, moduleName: string): boolean {
  if (!email) {
    return moduleName === 'calculator';
  }
  
  const user = USER_PERMISSIONS.find(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return moduleName === 'calculator';
  }
  
  // Si el usuario tiene acceso a todos los módulos
  if (user.modules.includes('ALL')) {
    return true;
  }
  
  return user.modules.includes(moduleName);
}
