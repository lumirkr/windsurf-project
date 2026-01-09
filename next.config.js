/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Configuración de alias para que coincida con tsconfig.json
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
  // Asegurar que los archivos estáticos tén cache
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
