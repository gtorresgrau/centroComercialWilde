const withPWA = require('next-pwa')({
  dest: "public", 
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: false,
  disableDevLogs: true
});

module.exports = withPWA({
  images: {
    domains: ['res.cloudinary.com', 'localhost', 'centrocomercialwilde.com'],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*', // Ensure this matches the path of your API routes
      },
    ];
  },
});
