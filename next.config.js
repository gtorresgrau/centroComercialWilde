const withPWA = require('next-pwa')({
  dest: 'public', // Specify the output directory for the PWA assets
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
        destination: '/api/contact', // Ensure this matches the path of your file
      },
    ];
  },
});
