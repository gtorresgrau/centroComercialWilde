const withPWA = require('next-pwa')({
  dest: "public", // Directorio donde se generará el Service Worker y los archivos relacionados
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  images: {
    domains: ['res.cloudinary.com', 'localhost', 'centrocomercialwilde.com'],
    unoptimized: true, // Permite deshabilitar la optimización automática de imágenes
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*', // Asegúrate de que esto coincida con la ruta de tus API routes
      },
    ];
  },
});
