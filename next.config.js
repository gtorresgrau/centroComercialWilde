// next.config.js
module.exports = {
    images: {
      domains: ['res.cloudinary.com'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/contact', // Asegúrate de que coincida con la ruta de tu archivo
        },
      ];
    },
  };
  