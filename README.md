# Windsurf Project

## Requisitos
- Node.js 18+
- npm 9+

## Instalación
```bash
npm install
```

## Desarrollo
Inicia el servidor de desarrollo de Next.js:
```bash
npm run dev
```
El servidor se abrirá en http://localhost:3000

## Estructura
- `src/app/` App Router de Next.js (páginas, layout y estilos globales)
- `src/components/` Componentes reutilizables (ej. `ResourceCard`, `Nav`)
- `public/` Archivos estáticos servidos desde la raíz (ej. imágenes)

## Notas
- Tailwind CSS v3 con PostCSS y Autoprefixer.
- Fuente Inter mediante `next/font`.
- Íconos con `@heroicons/react`. El recurso "Nest" usa una imagen en `public/images/nest-logo.png`.
